import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {AuthActionTypes, LoginFailure, LoginSuccess, LogoutSuccess} from '../actions/auth.actions';
import {Action} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserFirestore} from '../services/user-firestore.service';


@Injectable()
export class AuthEffects {

  @Effect()
  getUser$: Observable<Action> = this.actions$
    .ofType(AuthActionTypes.GET_USER)
    .switchMap(() => this.afsAuth.authState)
    .map(afUser => {
      if (afUser) {
        const user = {
          uid: afUser.uid,
          email: afUser.email,
          photoURL: afUser.photoURL,
          displayName: afUser.displayName
        };

        return new LoginSuccess({user: user});
      }
      return new LogoutSuccess();
    });

  @Effect()
  fbLogin$: Observable<Action> = this.actions$
    .ofType(AuthActionTypes.FB_LOGIN)
    .switchMap(() => {
      return this.authService.facebookLogin()
        .switchMap(user => this.userFirestore.save(user).map(() => user))
        .map(user => new LoginSuccess({user: user}))
        .catch(err => {
          console.error(err);
          return Observable.of(new LoginFailure({error: err.message}));
        });
    });

  @Effect({dispatch: false})
  loginSuccess$: Observable<boolean> = this.actions$
    .ofType(AuthActionTypes.LOGIN_SUCCESS)
    .switchMap(() => {
      return Observable.fromPromise(this.router.navigate(['/']));
    });

  @Effect({dispatch: false})
  logoutSuccess$: Observable<boolean> = this.actions$
    .ofType(AuthActionTypes.LOGOUT_SUCCESS)
    .switchMap(() => {
      return Observable.fromPromise(this.router.navigate(['/login']));
    });

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(AuthActionTypes.LOGOUT)
    .map(() => Observable.fromPromise(this.afsAuth.auth.signOut()))
    .map(() => new LogoutSuccess());



  constructor(private actions$: Actions,
              private afs: AngularFirestore,
              private afsAuth: AngularFireAuth,
              private userFirestore: UserFirestore,
              private authService: AuthService,
              private router: Router) {
  }
}
