import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserFirestore} from './user-firestore.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import AuthProvider = firebase.auth.AuthProvider;


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
              private userRepository: UserFirestore,
              private router: Router) {
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
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/login']);
  }

  facebookLogin(): Observable<MtravelUser> {
    const provider = new FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private authedUser(): Observable<MtravelUser | null> {
    return this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.userRepository.observeById(user.uid);
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
          photoURL: credential.user.photoURL
        };
      });
  }
}
