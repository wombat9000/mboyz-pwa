import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Observable, of} from 'rxjs/index';
import {map, take, switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import AuthProvider = firebase.auth.AuthProvider;
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import {DbRecord} from '../../holiday/models/DbRecord';


export interface MtravelUser extends DbRecord {
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
}

export function newTestUser(id: string = 'someId'): MtravelUser {
  return {
    id: id,
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

  activeUser(): Observable<MtravelUser | undefined> {
    return this.authedUser().pipe(
      take(1)
    );
  }

  isSignedIn(): Observable<boolean> {
    return this.authedUser().pipe(
      take(1),
      map(user => !!user)
    );
  }

  async signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  facebookLogin(): Observable<MtravelUser> {
    const provider: FacebookAuthProvider = new FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private authedUser(): Observable<MtravelUser | undefined> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user !== null) {
          return this.userService.observeById(user.uid);
        }
        return of(undefined);
      }));
  }

  private oAuthLogin(provider: AuthProvider): Observable<MtravelUser> {
    return fromPromise(this.afAuth.auth.signInWithPopup(provider)).pipe(
      map(credential => {
        return {
          id: credential.user.uid,
          email: credential.user.email,
          displayName: credential.user.displayName,
          photoURL: credential.user.providerData[0].photoURL
        };
      }));
  }
}
