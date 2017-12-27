import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {AuthService} from './core/auth.service';
import {authServiceMock} from './test-support/stubs';
import {Observable} from 'rxjs/Observable';

describe('AuthGuard', () => {
  let testee: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard,
        {
          provide: AuthService,
          useValue: authServiceMock
        }
      ]
    });

    testee = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
  });


  it('should not activate when user is not authenticated', (done) => {
    authService.isSignedIn.and.returnValue(Observable.of(false));
    const canActivate = testee.canActivate(null, null);

    canActivate.subscribe(it => {
      expect(it).toBe(false);
      done();
    });
  });

  it('should activate when user is authenticated', (done) => {
    authService.isSignedIn.and.returnValue(Observable.of(true));
    const canActivate = testee.canActivate(null, null);

    canActivate.subscribe(it => {
      expect(it).toBe(true);
      done();
    });
  });
});
