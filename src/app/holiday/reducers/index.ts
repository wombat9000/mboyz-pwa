import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromHolidays from './holiday.reducer';


export interface HolidaysState {
  holidays: fromHolidays.State;
}

export interface State {
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
    console.log('selecting holiday', selectedId);
    console.log('found:', entities);
    return selectedId && entities[selectedId];
  }
);
