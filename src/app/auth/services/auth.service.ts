import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import AuthProvider = firebase.auth.AuthProvider;
import {UserService} from './user.service';


export interface MtravelUser {
  uid: string;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
}

export function newTestUser(id: string = 'someId') {
  return {
    uid: id,
    email: 'someEmail',
    photoURL: 'somePhoto',
    displayName: 'someDisplayname'
  };
}

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private userService: UserService) {
  }

  activeUser(): Observable<MtravelUser | null> {
    return this.authedUser()
      .take(1);
  }

  isSignedIn(): Observable<boolean> {
    return this.authedUser()
      .take(1)
      .map(user => !!user);
  }

  async signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  facebookLogin(): Observable<MtravelUser> {
    const provider: FacebookAuthProvider = new FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private authedUser(): Observable<MtravelUser | null> {
    return this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.userService.observeById(user.uid);
      }
      return Observable.of(null);
    });
  }

  private oAuthLogin(provider: AuthProvider): Observable<MtravelUser> {
    return Observable.fromPromise(this.afAuth.auth.signInWithPopup(provider))
      .map(credential => {
        return {
          uid: credential.user.uid,
          email: credential.user.email,
          displayName: credential.user.displayName,
          photoURL: credential.user.providerData[0].photoURL
        };
      });
  }
}
