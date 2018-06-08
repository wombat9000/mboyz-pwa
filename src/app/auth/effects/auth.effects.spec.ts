import {AuthService, MtravelUser} from '../services/auth.service';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {
  authServiceMocker,
  getActions,
  routerMocker,
  TestActions,
  userFirestoreMocker
} from '../../test-support/stubs';
import {AuthEffects} from './auth.effects';
import {Actions} from '@ngrx/effects';
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
import {UserService} from '../services/user.service';
import {of} from 'rxjs';


describe('Auth Effects', () => {
  let actions$: TestActions;
  let effects: AuthEffects;
  let authService: jasmine.SpyObj<AuthService>;
  let userFS: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        {provide: UserService, useFactory: userFirestoreMocker},
        {provide: AuthService, useFactory: authServiceMocker},
        {provide: Router, useFactory: routerMocker},
        {provide: Actions, useFactory: getActions},
      ]
    });

    effects = TestBed.get(AuthEffects);
    userFS = TestBed.get(UserService);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    actions$ = TestBed.get(Actions);
  });

  const someUser: MtravelUser = {
    id: '',
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

      effects.authorise$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([someUrl]);
      });
    });
  });

  describe('unauthorised$', () => {
    it('should return authorise if authed', () => {
      authService.activeUser.and.returnValue(of(someUser));

      const action: Action = new Unauthorised({url: 'someUrl'});

      actions$.stream = hot('-a--', {a: action});

      effects.unauthorised$.subscribe((it: Action) => {
        expect(it).toEqual(new Authorise({user: someUser, url: 'someUrl'}));
      });
    });

    it('should return notAuthenticated if auth fails', () => {
      authService.activeUser.and.returnValue(of(null));

      const action: Action = new Unauthorised({url: 'someUrl'});

      actions$.stream = hot('-a--', {a: action});

      effects.unauthorised$.subscribe((it: Action) => {
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
      authService.signOut.and.returnValue(Promise.resolve());
      actions$.stream = hot('-a---', {a: action});
    });

    it('should sign out from afs', () => {
      effects.logout$.subscribe(() => {
        expect(authService.signOut).toHaveBeenCalled();
      });
    });

    it('should return logout success', () => {
      effects.logout$.subscribe((it: Action) => {
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
