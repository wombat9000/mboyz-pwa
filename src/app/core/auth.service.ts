import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {UserFirestore} from './user-firestore.service';
import {Router} from '@angular/router';


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
    this.user$ = this.afAuth.authState.switchMap(user => {
      if (user) {
        return userRepository.observeById(user.uid);
      }
      return Observable.of(null);
    });
  }

  activeUser(): Observable<User> {
    return this.user$
      .take(1);
  }


  isSignedIn(): Observable<boolean> {
    return this.user$
      .take(1)
      .map(user => !!user);
  }

  async signOut(): Promise<any> {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/login']);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.router.navigate(['/']);
    return this.updateUserData(credential);
  }

  private updateUserData(credential): Promise<void> {
    const user = credential.user;

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return this.userRepository.save(data);
  }
}
