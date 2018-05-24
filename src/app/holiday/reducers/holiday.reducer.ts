import * as actions from '../actions/holiday.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {HolidayDTO} from '../models/holiday';


export interface State extends EntityState<HolidayDTO> {
  selectedId: string | null;
}

export const adapter: EntityAdapter<HolidayDTO> = createEntityAdapter<HolidayDTO>({
  selectId: (holiday: HolidayDTO) => holiday.id,
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
      return adapter.addOne(action.payload.record, state);
    }

    case actions.AF_MODIFIED: {
      if (action.payload.record.id) {
        return adapter.updateOne({
          id: action.payload.record.id,
          changes: action.payload.record
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
      return adapter.removeOne(action.payload.record.id, state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedId;
