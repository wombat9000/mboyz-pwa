import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import * as firebase from 'firebase';


export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {

    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        console.log(`authenticated as ${user.uid}`);
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      }
      console.log('Not authenticated');
      return Observable.of(null);
    });
  }

  isSignedIn(): Observable<boolean> {
    return this.user
      .take(1)
      .map(user => !!user);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider);

    console.log('updating user data');
    return this.updateUserData(credential);
  }

  private updateUserData(credential) {
    const user = credential.user;

    console.log(user.uid);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    console.log('try writing to db');
    return this.afs.doc(`users/${user.uid}`).set(data);
  }
}
