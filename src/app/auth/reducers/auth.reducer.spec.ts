import {Authorise, LoginSuccess, NotAuthenticated} from '../actions/auth.actions';
import {initialState, reducer, State} from './auth.reducer';
import {MtravelUser} from '../services/auth.service';

describe('AuthReducer', () => {
  describe('authorise', () => {
    it('should set state to the logged in user', () => {
      const someUser: MtravelUser = {
        uid: 'someId',
        email: 'someMail',
        photoURL: null,
        displayName: null
      };
      const action = new Authorise({user: someUser, url: undefined});

      const loggedOut: State = {
        loggedIn: false,
        user: null
      };

      const result = reducer(loggedOut, action);
      expect(result.loggedIn).toEqual(true);
      expect(result.user).toEqual(someUser);
    });
  });

  describe('login success', () => {
    it('should set state to the logged in user', () => {
      const someUser: MtravelUser = {
        uid: 'someId',
        email: 'someMail',
        photoURL: null,
        displayName: null
      };
      const action = new LoginSuccess({user: someUser});

      const loggedOut: State = {
        loggedIn: false,
        user: null
      };

      const result = reducer(loggedOut, action);
      expect(result.loggedIn).toEqual(true);
      expect(result.user).toEqual(someUser);
    });
  });

  describe('logout success', () => {
    it('should return initial state', () => {
      const action = new NotAuthenticated();

      const state: State = {
        loggedIn: true,
        user: {
          uid: 'someId',
          email: 'someMail',
          photoURL: null,
          displayName: null
        }
      };

      const result = reducer(state, action);
      expect(result).toEqual(initialState);
    });
  });
});
