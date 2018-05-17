import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAppBar from '../core/reducers/app-bar.reducer';

export interface State {
  appBar: fromAppBar.State;
}

export const reducers: ActionReducerMap<State> = {
  appBar: fromAppBar.reducer,
};

export const getAppBarState = createFeatureSelector<fromAppBar.State>('appBar');


export const getTitle = createSelector(
  getAppBarState,
  fromAppBar.getTitle
);
