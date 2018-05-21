import {UserService} from '../auth/services/user.service';
import {AuthService} from '../auth/services/auth.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {FirebaseApp} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {Actions} from '@ngrx/effects';
import {FirebaseAuth, IdTokenResult, User} from '@firebase/auth-types';
import {EMPTY} from 'rxjs';
import {NgZone} from '@angular/core';
import {FirestoreService} from '../holiday/services/firestore.service';


export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

export class FireAuthStub extends AngularFireAuth {
  constructor() {
    super({}, {}, {}, jasmine.createSpyObj<NgZone>(['runOutsideAngular']));
  }
  app: FirebaseApp = jasmine.createSpyObj('FireBaseApp', ['']);
  auth: jasmine.SpyObj<FirebaseAuth> = jasmine.createSpyObj('FirebaseAuth', ['signOut', 'signInWithPopup']);
  authState: Observable<any | null>;
  idToken: Observable<string | null>;
  readonly idTokenResult: Observable<IdTokenResult | null>;
  readonly user: Observable<User | null>;
}

export const storeMocker: <T>() => jasmine.SpyObj<Store<T>> =
  () => jasmine.createSpyObj('Store', ['dispatch', 'select']);
export const routerMocker: () => jasmine.SpyObj<Router> =
  () => jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
export const authServiceMocker: () => jasmine.SpyObj<AuthService> = () => jasmine.createSpyObj('AuthService', [
  'isSignedIn',
  'signOut',
  'activeUser',
  'facebookLogin',
  'updateUserData'
]);
export const userFirestoreMocker: () => jasmine.SpyObj<UserService> =
  () => jasmine.createSpyObj('UserFirestore', ['observeById', 'save']);

export const firestoreServiceMocker: () => jasmine.SpyObj<FirestoreService> =
  () => jasmine.createSpyObj('FirestoreService', ['save', 'observeUpdates']);
