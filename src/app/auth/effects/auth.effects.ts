import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, User} from '../services/auth.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {AuthActionTypes, FbLogin, LoginSuccess} from '../actions/auth.actions';
import {Action} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';


@Injectable()
export class AuthEffects {

  // TODO: handle error case
  @Effect()
  $fbLogin: Observable<Action> = this.actions$
    .ofType(AuthActionTypes.FB_LOGIN)
    .switchMap((action: FbLogin) => {
      return this.authService.facebookLogin();
    })
    .map((it: User) => new LoginSuccess({user: it}));

  @Effect({dispatch: false})
  $loginSuccess: Observable<void> = this.actions$
    .ofType(AuthActionTypes.LOGIN_SUCCESS)
    .switchMap((action: LoginSuccess) => {
      const user = action.payload.user;
      const update = this.afs.doc(`users/${user.uid}`).set(user);
      // TODO: what happens when save fails?
      // TODO: what reasons to we have for save failing?
      return Observable.fromPromise(update);
    })
    .do(() => {
      this.router.navigate(['/']);
      return;
    });

  constructor(private actions$: Actions,
              private afs: AngularFirestore,
              private authService: AuthService,
              private router: Router) {
  }
}
