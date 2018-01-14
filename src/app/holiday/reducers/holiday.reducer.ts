import * as actions from '../actions/holiday.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Holiday} from '../holiday.service';
import {createFeatureSelector} from '@ngrx/store';


export interface State extends EntityState<Holiday> {
}

export const holidayAdapter = createEntityAdapter<Holiday>();
export const initialState: State = holidayAdapter.getInitialState();

export function reducer(state: State = initialState,
                        action: actions.HolidayActions) {

  switch (action.type) {

    case actions.ADDED:
    case actions.CREATE:
      return holidayAdapter.addOne(action.holiday, state);

    case actions.MODIFIED:
      return holidayAdapter.updateOne({
        id: action.holiday.id,
        changes: action.holiday
      }, state);

    case actions.REMOVED:
      return holidayAdapter.removeOne(action.holiday.id, state);

    default:
      return state;
  }
}

export const getHolidayState = createFeatureSelector<State>('holiday');
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = holidayAdapter.getSelectors(getHolidayState);
