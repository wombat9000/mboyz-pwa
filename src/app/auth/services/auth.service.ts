import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserFirestore} from './user-firestore.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;


export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  user$: Observable<User> = Observable.of(null);

  constructor(private afAuth: AngularFireAuth,
              private userRepository: UserFirestore,
              private router: Router) {
  }

  activeUser(): Observable<User> {
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

  facebookLogin(): Observable<User> {
    const provider = new FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private authedUser(): Observable<User> {
    return this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.userRepository.observeById(user.uid);
      }
      return Observable.of(null);
    });
  }

  private oAuthLogin(provider): Observable<User> {
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
