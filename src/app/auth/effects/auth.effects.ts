import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {from as fromPromise, Observable, of} from 'rxjs';
import {AuthActionTypes, Authorise, LoginFailure, LoginSuccess, NotAuthenticated, Unauthorised} from '../actions/auth.actions';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {UserService} from '../services/user.service';


@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  authorise$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AUTHORISE),
    switchMap((action: Authorise) => {
      return fromPromise(this.router.navigate([action.payload.url]));
    })
  );

  @Effect()
  unauthorised$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.UNAUTHORISED),
    switchMap<Action, Action>((action: Unauthorised) => {
      return this.authService.activeUser().pipe(map(afUser => {
        if (afUser) {
          return new Authorise({user: afUser, url: action.payload.url});
        }
        return new NotAuthenticated();
      }));
    })
  );

  @Effect()
  fbLogin$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.FACEBOOK_LOGIN),
    switchMap(() => {
      return this.authService.facebookLogin().pipe(
        switchMap(user => {
          return this.userService.save(user).pipe(
            map(() => user)
          );
        }),
        map(user => new LoginSuccess({user: user})),
        catchError(err => {
          return of(new LoginFailure({error: err.message}));
        })
      );
    })
  );

  @Effect({dispatch: false})
  loginSuccess$: Observable<boolean> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    switchMap(() => {
      // We run this in the ngZone to reactivate change detection after coming back from
      // third party login provider.
      // https://github.com/angular/angular/issues/18254
      return fromPromise(this.ngZone.run(() => this.router.navigate(['/'])));
    })
  );

  @Effect({dispatch: false})
  notAuthenticated$: Observable<boolean> = this.actions$.pipe(
    ofType(AuthActionTypes.NOT_AUTHENTICATED),
    switchMap(() => {
      return fromPromise(this.router.navigate(['/login']));
    })
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    map(() => fromPromise(this.authService.signOut())),
    map(() => new NotAuthenticated())
  );

  constructor(private actions$: Actions,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private ngZone: NgZone) {
  }
}
