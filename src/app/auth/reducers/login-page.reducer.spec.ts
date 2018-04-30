import {initialState, reducer} from './login-page.reducer';
import {FacebookLogin, LoginFailure, LoginSuccess} from '../actions/auth.actions';
import {newTestUser} from '../services/auth.service';


describe('LoginPageReducer', () => {
  describe('undefined action', () => {
    it('should return the default state when undefined', () => {
      const unknownAction = {} as any;
      const defaultState = {pending: false, error: null};

      const result = reducer(undefined, unknownAction);

      expect(result).toEqual(defaultState);
    });
    it('should return current state', () => {
      const unknownAction = {} as any;
      const loginPending = {pending: true, error: null};

      const result = reducer(loginPending, unknownAction);

      expect(result).toEqual(loginPending);
    });
  });

  describe('fbLogin', () => {
    it('it should go into pending state', () => {
      const loginPending = {pending: true, error: null};

      const result = reducer(initialState, new FacebookLogin());

      expect(result).toEqual(loginPending);
    });
  });

  describe('loginSuccess', () => {
    it('state is no longer pending', () => {
      const loginPending = {pending: true, error: null};
      const result = reducer(loginPending, new LoginSuccess({user: newTestUser()}));

      const loginNotPending = {pending: false, error: null};
      expect(result).toEqual(loginNotPending);
    });
  });

  describe('loginFailure', () => {
    it('state is no longer pending, has error message', () => {
      const expectedError = 'some message';
      const errorState = {pending: false, error: expectedError};

      const result = reducer({pending: true, error: null}, new LoginFailure({error: expectedError}));

      expect(result).toEqual(errorState);
    });
  });
});
