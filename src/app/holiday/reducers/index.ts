import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromHolidays from './holiday.reducer';
import * as fromPosts from './posts.reducer';
import * as fromUsers from './users.reducer';
import * as fromComments from './comments.reducer';
import * as fromRoot from '../../reducers';
import {PostDTO} from '../models/post';
import {CommentDTO} from '../models/comment';

export interface HolidaysState {
  holidays: fromHolidays.State;
  posts: fromPosts.State;
  comments: fromComments.State;
  users: fromUsers.State;
}

export interface State extends fromRoot.State {
  holidayPlanner: HolidaysState;
}

export const reducers = {
  holidays: fromHolidays.reducer,
  posts: fromPosts.reducer,
  comments: fromComments.reducer,
  users: fromUsers.reducer
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

export const getCommentsEntitiesState = createSelector(
  getHolidayPlannerState,
  (state: HolidaysState) => state.comments
);

export const getUsersEntitiesState = createSelector(
  getHolidayPlannerState,
  (state: HolidaysState) => state.users
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
    return selectedId ? entities[selectedId] : null;
  }
);

export const getAllPosts = fromPosts.adapter.getSelectors(getPostEntitiesState).selectAll;
export const getAllComments = fromComments.adapter.getSelectors(getCommentsEntitiesState).selectAll;
export const selectUserEntities = fromUsers.adapter.getSelectors(getUsersEntitiesState).selectEntities;

export const getSelectedPosts = createSelector(
  getSelectedHolidayId,
  getAllPosts,
  (holidayId: string, posts: PostDTO[]) => {
    return posts.filter(it => it.holidayId === holidayId);
  }
);

export function getUserForId(userId: string) {
  return createSelector(
    selectUserEntities,
    (entities) => {
      return userId ? entities[userId] : null;
    }
  );
}

export function getCommentsForPostId(postId: string) {
  return createSelector(
    getAllComments,
    (comments: CommentDTO[]) => {
      return comments.filter(comment => comment.postId === postId);
    }
  );
}
