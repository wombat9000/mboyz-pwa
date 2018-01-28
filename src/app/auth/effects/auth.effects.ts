import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, User} from '../services/auth.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {AuthActionTypes, LoginSuccess} from '../actions/auth.actions';
import {Action} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserFirestore} from '../services/user-firestore.service';


@Injectable()
export class AuthEffects {

  // TODO: handle error case
  @Effect()
  fbLogin$: Observable<Action> = this.actions$
    .ofType(AuthActionTypes.FB_LOGIN)
    .switchMap(() => {
      return this.authService.facebookLogin();
    })
    .mergeMap((user: User) => {
      return this.userFirestore.save(user)
        .map(it => new LoginSuccess({user: user}));
    });

  @Effect({dispatch: false})
  loginSuccess$: Observable<boolean> = this.actions$
    .ofType(AuthActionTypes.LOGIN_SUCCESS)
    .switchMap(() => {
      return Observable.fromPromise(this.router.navigate(['/']));
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
              private userFirestore: UserFirestore,
              private authService: AuthService,
              private router: Router) {
  }
}
