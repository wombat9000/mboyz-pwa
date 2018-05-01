import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {AuthActionTypes, Authorise, LoginFailure, LoginSuccess, NotAuthenticated, Unauthorised} from '../actions/auth.actions';
import {Action} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserFirestore} from '../services/user-firestore.service';
import {map, switchMap} from 'rxjs/operators';


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
      return this.afsAuth.authState.map(afUser => {
        if (afUser) {
          const user = {
            uid: afUser.uid,
            email: afUser.email,
            photoURL: afUser.photoURL,
            displayName: afUser.displayName
          };
          return new Authorise({user: user, url: action.payload.url});
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
        .switchMap(user => this.userFirestore.save(user).map(() => user))
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
    map(() => Observable.fromPromise(this.afsAuth.auth.signOut())),
    map(() => new NotAuthenticated())
  );

  constructor(private actions$: Actions,
              private afs: AngularFirestore,
              private afsAuth: AngularFireAuth,
              private userFirestore: UserFirestore,
              private authService: AuthService,
              private router: Router) {
  }
}
