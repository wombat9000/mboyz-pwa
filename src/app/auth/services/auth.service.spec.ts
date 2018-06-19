import {TestBed} from '@angular/core/testing';

import {AuthService, MtravelUser} from './auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {FireAuthStub, userFirestoreMocker} from '../../test-support/stubs';
import {UserService} from './user.service';
import {of} from 'rxjs';


describe('Auth Service', () => {

  let testee: AuthService;
  let fireAuth: FireAuthStub;
  let userRepo: jasmine.SpyObj<UserService>;

  const someUser: MtravelUser = {
    id: 'someUID',
    email: 'someEmail',
    displayName: null,
    photoURL: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: AngularFireAuth, useClass: FireAuthStub},
        {provide: UserService, useFactory: userFirestoreMocker}
      ]
    });

    testee = TestBed.get(AuthService);
    fireAuth = TestBed.get(AngularFireAuth);
    userRepo = TestBed.get(UserService);
  });

  it('current user is undefined if authState is undefined', (done) => {
    fireAuth.authState = of(null);

    testee.activeUser().subscribe(it => {
      expect(it).toBe(undefined);
      done();
    });
  });

  it('current user is updated from auth state', (done) => {
    userRepo.observeById.mockReturnValue(of(someUser));
    fireAuth.authState = of(someUser);

    testee.activeUser().subscribe(it => {
      expect(it).toBe(someUser);
      done();
    });
  });

  describe('signOut', () => {

    beforeEach(async () => {
      userRepo.observeById.mockReturnValue(of(someUser));
      fireAuth.authState = of(someUser);
      await testee.signOut();
    });

    it('should unauthenticate the user', () => {
      expect(fireAuth.auth.signOut).toHaveBeenCalled();
    });
  });

  describe('login with facebook', () => {
    const user: MtravelUser = {
      id: 'someUid',
      email: 'someEmail',
      displayName: 'someName',
      photoURL: 'someUrl'
    };
    const credential = {user: user};

    beforeEach(async () => {
      fireAuth.authState = of(null);
      fireAuth.auth.signInWithPopup.mockReturnValue(credential);
      await testee.facebookLogin();
    });

    it('should sign in with popup', () => {
      expect(fireAuth.auth.signInWithPopup).toHaveBeenCalled();
    });
  });
});
