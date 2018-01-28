import {LoginSuccess, LogoutSuccess} from '../actions/auth.actions';
import {initialState, reducer} from './auth.reducer';

describe('AuthReducer', () => {
  describe('login success', () => {
    it('should set state to the logged in user', () => {
      const someUser = {uid: 'someId', email: 'someMail'};
      const action = new LoginSuccess({user: someUser});

      const loggedOut = {
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
      const action = new LogoutSuccess();

      const state = {
        loggedIn: true,
        user: {uid: 'someId', email: 'someMail'}
      };

      const result = reducer(state, action);
      expect(result).toEqual(initialState);
    });
  });
});
