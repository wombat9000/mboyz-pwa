import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, User} from '../services/auth.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {AuthActionTypes, LoginSuccess} from '../actions/auth.actions';
import {Action} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';


@Injectable()
export class AuthEffects {

  // TODO: handle error case
  @Effect()
  fbLogin$: Observable<Action> = this.actions$
    .ofType(AuthActionTypes.FB_LOGIN)
    .switchMap(() => {
      return this.authService.facebookLogin();
    })
    .map((it: User) => new LoginSuccess({user: it}));

  @Effect({dispatch: false})
  loginSuccess$: Observable<void> = this.actions$
    .ofType(AuthActionTypes.LOGIN_SUCCESS)
    .switchMap((action: LoginSuccess) => {
      const user = action.payload.user;
      const update = this.afs.doc(`users/${user.uid}`).set(user);
      // TODO: what happens when save fails?
      // TODO: what reasons are there for save to fail?
      return Observable.fromPromise(update);
    })
    .do(() => {
      this.router.navigate(['/']);
      return;
    });

  @Effect({dispatch: false})
  logout$: Observable<void> = this.actions$
    .ofType(AuthActionTypes.LOGOUT)
    .map(() => Observable.fromPromise(this.afsAuth.auth.signOut()))
    .map(() => {
      this.router.navigate(['/login']);
    });

  constructor(private actions$: Actions,
              private afs: AngularFirestore,
              private afsAuth: AngularFireAuth,
              private authService: AuthService,
              private router: Router) {
  }
}
