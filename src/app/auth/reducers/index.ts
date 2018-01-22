import * as fromAuth from './auth.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';


export interface AuthState {
  status: fromAuth.State;
}

export interface State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<any> = {
  status: fromAuth.reducer
};
