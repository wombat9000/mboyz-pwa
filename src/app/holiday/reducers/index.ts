import {ActionReducerMap} from '@ngrx/store';
import * as fromHolidays from './holiday.reducer';

export interface State {
  holidays: fromHolidays.State;
}

export const reducers: ActionReducerMap<any> = {
  holiday: fromHolidays.reducer
};
