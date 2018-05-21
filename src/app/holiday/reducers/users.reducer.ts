import * as actions from '../actions/user.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {MtravelUser} from '../../auth/services/auth.service';
import {MtravelUserActions} from '../actions/user.actions';

export interface State extends EntityState<MtravelUser> {
}

export const adapter: EntityAdapter<MtravelUser> = createEntityAdapter<MtravelUser>({
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({});

export function reducer(state: State = initialState,
                        action: MtravelUserActions) {

  switch (action.type) {
    case actions.CREATE:
    case actions.AF_ADDED: {
      return adapter.addOne(action.payload.record, state);
    }

    case actions.AF_REMOVED: {
      return adapter.removeOne(action.payload.record.id, state);
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

    default: {
      return state;
    }
  }
}
