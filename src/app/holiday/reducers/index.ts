import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromHolidays from './holiday.reducer';
import * as fromRoot from '../../reducers';


export interface HolidaysState {
  holidays: fromHolidays.State;
}

export interface State extends fromRoot.State {
  holidays: HolidaysState;
}

export const reducers = {
  holidays: fromHolidays.reducer
};

export const getHolidaysState = createFeatureSelector<HolidaysState>('holidays');

export const getHolidayEntitiesState = createSelector(
  getHolidaysState,
  state => state.holidays
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
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
