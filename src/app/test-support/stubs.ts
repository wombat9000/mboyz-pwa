import {FirebaseApp} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {Actions} from '@ngrx/effects';
import {IdTokenResult, User} from '@firebase/auth-types';
import {EMPTY} from 'rxjs';
import Auth = firebase.auth.Auth;


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
  app: FirebaseApp = jest.fn();
  auth: jasmine.SpyObj<Auth> = {
    signOut: jest.fn(),
    signInWithPopup: jest.fn()
  };
  authState: Observable<any | null>;
  idToken: Observable<string | null>;
  readonly idTokenResult: Observable<IdTokenResult | null>;
  readonly user: Observable<User | null>;

  constructor() {
    super({}, {}, {}, {
      runOutsideAngular: jest.fn()
    });
  }
}

export const routerMocker: () => any = () => {
  return {
    navigate: jest.fn(),
    navigateByUrl: jest.fn()
  };
};

export const authServiceMocker: () => any = () => {
  return {
    isSignedIn: jest.fn(),
    signOut: jest.fn(),
    activeUser: jest.fn(),
    facebookLogin: jest.fn(),
    updateUserData: jest.fn()
  };
};

export const userFirestoreMocker: () => any =
  () => {
    return {
      observeById: jest.fn(),
      save: jest.fn()
    };
  };

export const firestoreServiceMocker: () => any = () => {
  return {
    save: jest.fn(),
    observeUpdates: jest.fn()
  };
};
