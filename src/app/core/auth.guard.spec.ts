import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {authServiceMock, routerMock} from '../test-support/stubs';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

describe('AuthGuard', () => {
  let testee: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: authServiceMock},
        {provide: Router, useValue: routerMock}
      ]
    });

    testee = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });


  it('should not activate when user is not authenticated', (done) => {
    authService.isSignedIn.and.returnValue(Observable.of(false));
    const canActivate = testee.canActivate(null, null);

    canActivate.subscribe(it => {
      expect(it).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
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
