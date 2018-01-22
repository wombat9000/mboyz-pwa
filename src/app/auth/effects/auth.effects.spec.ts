import {AuthService, User} from '../services/auth.service';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {authServiceMocker, routerMocker} from '../../test-support/stubs';
import {AuthEffects} from './auth.effects';
import {Actions} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';
import {cold, hot} from 'jasmine-marbles';
import {Action} from '@ngrx/store';
import {FbLogin, LoginSuccess} from '../actions/auth.actions';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';

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

describe('AuthEffects', () => {
  let actions$: TestActions;
  let effects: AuthEffects;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;


  const afsMock: jasmine.SpyObj<AngularFirestore> = jasmine.createSpyObj('AngularFireStore', ['doc']);
  const afsDocMock: jasmine.SpyObj<AngularFirestoreDocument<User>> =
    jasmine.createSpyObj('AngularFirestoreDocument', ['set']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        {provide: AuthService, useFactory: authServiceMocker},
        {provide: AngularFirestore, useValue: afsMock},
        {provide: Router, useFactory: routerMocker},
        {provide: Actions, useFactory: getActions},
      ]
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    actions$ = TestBed.get(Actions);

    afsMock.doc.and.returnValue(afsDocMock);
    afsDocMock.set.and.returnValue(Promise.resolve());
  });

  describe('fbLogin$', () => {
    it('should return login success if successful', () => {
      const someUser: User = {
        uid: '',
        displayName: '',
        photoURL: '',
        email: ''
      };

      const action: Action = new FbLogin();
      const completion = new LoginSuccess({user: someUser});

      actions$.stream = hot('-a---', {a: action});
      const response = cold('-a|', {a: someUser});
      const expected = cold('--b', {b: completion});

      authService.facebookLogin.and.returnValue(response);

      expect(effects.$fbLogin).toBeObservable(expected);
    });
  });

  describe('loginSuccess$', () => {
    it('should update user data and navigate to root', () => {
      const someUser: User = {
        uid: 'someUid',
        displayName: '',
        photoURL: '',
        email: ''
      };

      const action: Action = new LoginSuccess({user: someUser});
      router.navigate.and.returnValue(Promise.resolve());
      actions$.stream = hot('-a---', {a: action});

      effects.$loginSuccess.subscribe(() => {
        expect(afsMock.doc).toHaveBeenCalledWith(`users/${someUser.uid}`);
        expect(afsDocMock.set).toHaveBeenCalledWith(someUser);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });
});
