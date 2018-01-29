import {AuthService, User} from '../services/auth.service';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {authServiceMocker, FireAuthStub, routerMocker, userFirestoreMocker} from '../../test-support/stubs';
import {AuthEffects} from './auth.effects';
import {Actions} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';
import {cold, hot} from 'jasmine-marbles';
import {Action} from '@ngrx/store';
import {
  Authorise,
  FacebookLogin,
  LoginFailure,
  LoginSuccess,
  Logout,
  NotAuthenticated,
  Unauthorised
} from '../actions/auth.actions';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserFirestore} from '../services/user-firestore.service';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('Auth Effects', () => {
  let actions$: TestActions;
  let effects: AuthEffects;
  let authService: jasmine.SpyObj<AuthService>;
  let userFS: jasmine.SpyObj<UserFirestore>;
  let router: jasmine.SpyObj<Router>;
  let afsAuthMock: FireAuthStub;
  const afsMock: jasmine.SpyObj<AngularFirestore> = jasmine.createSpyObj('AngularFireStore', ['doc']);
  const afsDocMock: jasmine.SpyObj<AngularFirestoreDocument<User>> =
    jasmine.createSpyObj('AngularFirestoreDocument', ['set']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        {provide: UserFirestore, useFactory: userFirestoreMocker},
        {provide: AuthService, useFactory: authServiceMocker},
        {provide: AngularFirestore, useValue: afsMock},
        {provide: AngularFireAuth, useClass: FireAuthStub},
        {provide: Router, useFactory: routerMocker},
        {provide: Actions, useFactory: getActions},
      ]
    });

    effects = TestBed.get(AuthEffects);
    userFS = TestBed.get(UserFirestore);
    authService = TestBed.get(AuthService);
    afsAuthMock = TestBed.get(AngularFireAuth);
    router = TestBed.get(Router);
    actions$ = TestBed.get(Actions);

    afsMock.doc.and.returnValue(afsDocMock);
    afsDocMock.set.and.returnValue(Promise.resolve());
  });

  const someUser: User = {
    uid: '',
    displayName: '',
    photoURL: '',
    email: ''
  };

  describe('authorise', () => {
    it('should navigate to authorised url', () => {
      const someUrl = '/someUrl';

      const action: Action = new Authorise({user: someUser, url: someUrl});

      actions$.stream = hot('-a--', {a: action});
      router.navigate.and.returnValue(Promise.resolve());

      effects.authorise$.subscribe((it) => {
        expect(router.navigate).toHaveBeenCalledWith([someUrl]);
      });
    });
  });

  describe('unauthorised$', () => {
    it('should return authorise if authed', () => {
      afsAuthMock.authState = Observable.of(someUser);
      const action: Action = new Unauthorised({url: 'someUrl'});

      actions$.stream = hot('-a--', {a: action});

      effects.unauthorised$.subscribe((it) => {
        expect(it).toEqual(new Authorise({user: someUser, url: 'someUrl'}));
      });
    });

    it('should return notAuthenticated if auth fails', () => {
      afsAuthMock.authState = Observable.of(null);
      const action: Action = new Unauthorised({url: 'someUrl'});

      actions$.stream = hot('-a--', {a: action});

      effects.unauthorised$.subscribe((it) => {
        expect(it).toEqual(new NotAuthenticated());
      });
    });
  });

  describe('fbLogin$', () => {
    it('should return login success if successful', () => {
      const action: Action = new FacebookLogin();
      const completion = new LoginSuccess({user: someUser});

      actions$.stream = hot('-a--', {a: action});
      const fbSuccess = cold('-a|', {a: someUser});
      const saveSuccess = cold('-a|');
      const expected = cold('---b', {b: completion});

      userFS.save.and.returnValue(saveSuccess);
      authService.facebookLogin.and.returnValue(fbSuccess);
      expect(effects.fbLogin$).toBeObservable(expected);
      expect(userFS.save).toHaveBeenCalledWith(someUser);
    });

    it('should return login failure if oauth fails', () => {
      const action: Action = new FacebookLogin();
      const completion = new LoginFailure({error: 'someError'});

      const error = {message: 'someError'};

      actions$.stream = hot('-a--', {a: action});
      const fbError = cold('-#|', {}, error);
      const expected = cold('--b', {b: completion});

      authService.facebookLogin.and.returnValue(fbError);

      expect(effects.fbLogin$).toBeObservable(expected);
    });

    it('should return login failure if saving fails', () => {
      const action: Action = new FacebookLogin();
      const completion = new LoginFailure({error: 'someError'});

      const error = {message: 'someError'};

      actions$.stream = hot('-a---', {a: action});
      const fbSuccess = cold('-a|', {a: someUser});
      const saveFail = cold('-#|', {}, error);
      const expected = cold('---b', {b: completion});

      authService.facebookLogin.and.returnValue(fbSuccess);
      userFS.save.and.returnValue(saveFail);

      expect(effects.fbLogin$).toBeObservable(expected);
    });
  });

  describe('loginSuccess$', () => {
    beforeEach(() => {
      const action: Action = new LoginSuccess({user: someUser});
      router.navigate.and.returnValue(Promise.resolve());
      actions$.stream = hot('-a---', {a: action});
    });

    it('should navigate to root', () => {
      effects.loginSuccess$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });

  describe('logout$', () => {
    beforeEach(() => {
      const action: Action = new Logout();
      afsAuthMock.auth.signOut.and.returnValue(Promise.resolve());
      actions$.stream = hot('-a---', {a: action});
    });

    it('should sign out from afs', () => {
      effects.logout$.subscribe(() => {
        expect(afsAuthMock.auth.signOut).toHaveBeenCalled();
      });
    });

    it('should return logout success', () => {
      effects.logout$.subscribe((it) => {
        expect(it).toEqual(new NotAuthenticated());
      });
    });
  });

  describe('logoutSuccess$', () => {
    beforeEach(() => {
      const action: Action = new NotAuthenticated();
      router.navigate.and.returnValue(Promise.resolve());
      actions$.stream = hot('-a---', {a: action});
    });

    it('should redirect to login', () => {
      effects.notAuthenticated$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      });
    });
  });
});
