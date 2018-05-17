import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {AuthActionTypes, Authorise, LoginFailure, LoginSuccess, NotAuthenticated, Unauthorised} from '../actions/auth.actions';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {fromPromise} from 'rxjs/observable/fromPromise';


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
    switchMap((action: Unauthorised) => {
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
      return fromPromise(this.router.navigate(['/']));
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
              private router: Router) {
  }
}
