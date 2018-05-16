import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {AuthActionTypes, Authorise, LoginFailure, LoginSuccess, NotAuthenticated, Unauthorised} from '../actions/auth.actions';
import {Action} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import {UserService} from '../services/user.service';


@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  authorise$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AUTHORISE),
    switchMap((action: Authorise) => {
      return Observable.fromPromise(this.router.navigate([action.payload.url]));
    })
  );

  @Effect()
  unauthorised$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.UNAUTHORISED),
    switchMap((action: Unauthorised) => {
      return this.authService.activeUser().map(afUser => {
        if (afUser) {
          return new Authorise({user: afUser, url: action.payload.url});
        }
        return new NotAuthenticated();
      });
    })
  );

  @Effect()
  fbLogin$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.FACEBOOK_LOGIN),
    switchMap(() => {
      return this.authService.facebookLogin()
        .switchMap(user => this.userService.save(user).map(() => user))
        .map(user => new LoginSuccess({user: user}))
        .catch(err => {
          return Observable.of(new LoginFailure({error: err.message}));
        });
    })
  );

  @Effect({dispatch: false})
  loginSuccess$: Observable<boolean> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    switchMap(() => {
      return Observable.fromPromise(this.router.navigate(['/']));
    })
  );

  @Effect({dispatch: false})
  notAuthenticated$: Observable<boolean> = this.actions$.pipe(
    ofType(AuthActionTypes.NOT_AUTHENTICATED),
    switchMap(() => {
      return Observable.fromPromise(this.router.navigate(['/login']));
    })
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    map(() => Observable.fromPromise(this.authService.signOut())),
    map(() => new NotAuthenticated())
  );

  constructor(private actions$: Actions,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) {
  }
}
