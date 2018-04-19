import * as fromRoot from '../../reducers';
import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';


export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<any> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);

export const getUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);

export const isLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.isLoggedIn
);

export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);

export const getErrorMessage = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);
