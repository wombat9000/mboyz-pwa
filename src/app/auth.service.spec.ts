import {TestBed} from '@angular/core/testing';

import {AuthService, User} from './auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';
import {Subject} from 'rxjs/Subject';
import {UserRepository} from './user-repository.service';
import {userRepositoryMock} from './test-support/stubs';
import {Observable} from 'rxjs/Observable';

describe('AuthService', () => {

  let testee: AuthService;
  let fireAuth;
  let userRepo: jasmine.SpyObj<UserRepository>;

  const someUser = {
    uid: 'someUID',
    email: 'someEmail'
  };

  class FireAuthStub {
    authState: Subject<User | null> = new Subject();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: AngularFireAuth, useClass: FireAuthStub},
        {provide: UserRepository, useValue: userRepositoryMock}
      ]
    });

    testee = TestBed.get(AuthService);
    fireAuth = TestBed.get(AngularFireAuth);
    userRepo = TestBed.get(UserRepository);
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
});