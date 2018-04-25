import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromHolidays from './holiday.reducer';
import * as fromPosts from './posts.reducer';
import * as fromRoot from '../../reducers';
import {Post} from '../models/post';

export interface HolidaysState {
  holidays: fromHolidays.State;
  posts: fromPosts.State;
}

export interface State extends fromRoot.State {
  holidayPlanner: HolidaysState;
}

export const reducers = {
  holidays: fromHolidays.reducer,
  posts: fromPosts.reducer
};

export const getHolidayPlannerState = createFeatureSelector<HolidaysState>('holidayPlanner');

export const getHolidayEntitiesState = createSelector(
  getHolidayPlannerState,
  (state: HolidaysState) => state.holidays
);

export const getPostEntitiesState = createSelector(
  getHolidayPlannerState,
  (state: HolidaysState) => state.posts
);

export const getSelectedHolidayId = createSelector(
  getHolidayEntitiesState,
  fromHolidays.getSelectedId
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = fromHolidays.adapter.getSelectors(getHolidayEntitiesState);

export const getSelectedHoliday = createSelector(
  selectEntities,
  getSelectedHolidayId,
  (entities, selectedId: string) => {
    return selectedId && entities[selectedId];
  }
);


export const getAllPosts = fromPosts.adapter.getSelectors(getPostEntitiesState).selectAll;

export const getSelectedPosts = createSelector(
  getSelectedHolidayId,
  getAllPosts,
  (holidayId: string, posts: Post[]) => {
    return posts.filter(it => it.holidayId === holidayId);
  }
);
