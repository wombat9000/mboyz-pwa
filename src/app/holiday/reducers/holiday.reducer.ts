import * as actions from '../actions/holiday.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Holiday} from '../holiday.service';


export interface State extends EntityState<Holiday> {}

export const holidayAdapter = createEntityAdapter<Holiday>();
export const initialState: State = holidayAdapter.getInitialState();

export function reducer(state: State = initialState,
                        action: actions.HolidayActions) {

  switch (action.type) {
    case actions.CREATE:
      return holidayAdapter.addOne(action.holiday, state);
    default:
      return state;
  }
}
