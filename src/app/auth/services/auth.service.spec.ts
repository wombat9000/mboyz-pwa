import {TestBed} from '@angular/core/testing';

import {AuthService, MtravelUser} from './auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';
import {FireAuthStub, routerMocker, userFirestoreMocker} from '../../test-support/stubs';
import {Observable} from 'rxjs/Observable';
import {UserFirestore} from './user-firestore.service';
import {Router} from '@angular/router';


describe('Auth Service', () => {

  let testee: AuthService;
  let fireAuth: FireAuthStub;
  let userRepo: jasmine.SpyObj<UserFirestore>;

  const someUser = {
    uid: 'someUID',
    email: 'someEmail',
    displayName: null,
    photoURL: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: AngularFireAuth, useClass: FireAuthStub},
        {provide: UserFirestore, useFactory: userFirestoreMocker},
        {provide: Router, useFactory: routerMocker}
      ]
    });

    testee = TestBed.get(AuthService);
    fireAuth = TestBed.get(AngularFireAuth);
    userRepo = TestBed.get(UserFirestore);
  });

  it('current user is null if authState is null', (done) => {
    fireAuth.authState = Observable.of(null);

    testee.activeUser().subscribe(it => {
      expect(it).toBe(null);
      done();
    });
  });

  it('current user is updated from auth state', (done) => {
    userRepo.observeById.and.returnValue(Observable.of(someUser));
    fireAuth.authState = Observable.of(someUser);

    testee.activeUser().subscribe(it => {
      expect(it).toBe(someUser);
      done();
    });
  });

  describe('signOut', () => {
    let router;

    beforeEach(async () => {
      router = TestBed.get(Router);
      userRepo.observeById.and.returnValue(Observable.of(someUser));
      fireAuth.authState = Observable.of(someUser);
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
    const user: MtravelUser = {
      uid: 'someUid',
      email: 'someEmail',
      displayName: 'someName',
      photoURL: 'someUrl'
    };
    const credential = {user: user};

    beforeEach(async () => {
      router = TestBed.get(Router);
      fireAuth.authState = Observable.of(null);
      fireAuth.auth.signInWithPopup.and.returnValue(credential);
      await testee.facebookLogin();
    });

    it('should sign in with popup', () => {
      expect(fireAuth.auth.signInWithPopup).toHaveBeenCalled();
    });
  });
});
