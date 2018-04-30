import * as actions from '../actions/holiday.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Holiday} from '../models/holiday';


export interface State extends EntityState<Holiday> {
  selectedId: string | null;
}

export const adapter: EntityAdapter<Holiday> = createEntityAdapter<Holiday>({
  selectId: (holiday: Holiday) => holiday.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedId: null
});

export function reducer(state: State = initialState,
                        action: actions.HolidayActions) {

  switch (action.type) {
    case actions.AF_ADDED:
    case actions.CREATE: {
      return adapter.addOne(action.holiday, state);
    }

    case actions.AF_MODIFIED: {
      if (action.holiday.id) {
        return adapter.updateOne({
          id: action.holiday.id,
          changes: action.holiday
        }, state);
      }
      return state;
    }

    case actions.SELECT: {
      return {
        ...state,
        selectedId: action.payload.id
      };
    }

    case actions.AF_REMOVED: {
      return adapter.removeOne(action.holiday.id, state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedId;
