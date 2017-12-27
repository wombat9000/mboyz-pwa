import {TestBed} from '@angular/core/testing';

import {AuthService, User} from './auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';
import {Subject} from 'rxjs/Subject';
import {routerMock, userFirestoreMock} from '../test-support/stubs';
import {Observable} from 'rxjs/Observable';
import {UserFirestore} from './user-firestore.service';
import {Router} from '@angular/router';

describe('AuthService', () => {

  let testee: AuthService;
  let fireAuth;
  let userRepo: jasmine.SpyObj<UserFirestore>;

  const someUser = {
    uid: 'someUID',
    email: 'someEmail'
  };

  class FireAuthStub {
    authState: Subject<User | null> = new Subject();
    auth = jasmine.createSpyObj('Auth', ['signOut', 'signInWithPopup']);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: AngularFireAuth, useClass: FireAuthStub},
        {provide: UserFirestore, useValue: userFirestoreMock},
        {provide: Router, useValue: routerMock}
      ]
    });

    testee = TestBed.get(AuthService);
    fireAuth = TestBed.get(AngularFireAuth);
    userRepo = TestBed.get(UserFirestore);
  });

  it('current user is null if authState is null', (done) => {
    testee.user.subscribe(it => {
      expect(it).toBe(null);
      done();
    });
    fireAuth.authState.next(null);
  });

  it('current user is updated from auth state', (done) => {
    testee.user.subscribe(it => {
      expect(it).toBe(someUser);
      done();
    });

    userRepo.observeById.and.returnValue(Observable.of(someUser));
    fireAuth.authState.next(someUser);
  });

  describe('signOut', () => {
    let router;

    beforeEach(async () => {
      router = TestBed.get(Router);
      userRepo.observeById.and.returnValue(Observable.of(someUser));
      fireAuth.authState.next(someUser);
      await testee.signOut();
    });

    it('should unauthenticate the user', () => {
      expect(fireAuth.auth.signOut).toHaveBeenCalled();
    });

    it('should redirect to login screen', () => {
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('login with facebook', () => {
    let router;
    const user: User = {
      uid: 'someUid',
      email: 'someEmail',
      displayName: 'someName',
      photoURL: 'someUrl'
    };
    const credential = {user: user};

    beforeEach(async () => {
      router = TestBed.get(Router);
      fireAuth.authState.next(null);
      fireAuth.auth.signInWithPopup.and.returnValue(credential);
      await testee.facebookLogin();
    });

    it('should sign in with popup', () => {
      expect(fireAuth.auth.signInWithPopup).toHaveBeenCalled();
    });

    it('should save user credentials', () => {
      expect(userRepo.save).toHaveBeenCalledWith(user);
    });

    it('should route to home', () => {
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
