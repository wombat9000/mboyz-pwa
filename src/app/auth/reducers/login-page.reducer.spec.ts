import {reducer} from './login-page.reducer';
import {FbLogin, LoginFailure, LoginSuccess} from '../actions/auth.actions';


describe('LoginPageReducer', () => {
  describe('undefined action', () => {
    it('should return the default state when undefined', () => {
      const unknownAction = {} as any;
      const defaultState = {pending: false};

      const result = reducer(undefined, unknownAction);

      expect(result).toEqual(defaultState);
    });
    it('should return current state', () => {
      const unknownAction = {} as any;
      const loginPending = {pending: true};

      const result = reducer(loginPending, unknownAction);

      expect(result).toEqual(loginPending);
    });
  });

  describe('fbLogin', () => {
    it('it should go into pending state', () => {
      const loginPending = {pending: true};

      const result = reducer(undefined, new FbLogin());

      expect(result).toEqual(loginPending);
    });
  });

  describe('loginSuccess', () => {
    it('state is no longer pending', () => {
      const loginNotPending = {pending: false};

      const result = reducer({pending: true}, new LoginSuccess({user: undefined}));

      expect(result).toEqual(loginNotPending);
    });
  });

  describe('loginFailure', () => {
    it('state is no longer pending, has error message', () => {
      const expectedError = 'some message';
      const errorState = {pending: false, error: expectedError};

      const result = reducer({pending: true}, new LoginFailure({error: expectedError}));

      expect(result).toEqual(errorState);
    });
  });
});
