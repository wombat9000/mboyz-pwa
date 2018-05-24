import * as actions from '../actions/comment.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {CommentDTO} from '../models/comment';

export interface State extends EntityState<CommentDTO> {
}

export const adapter: EntityAdapter<CommentDTO> = createEntityAdapter<CommentDTO>({
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({});

export function reducer(state: State = initialState,
                        action: actions.CommentActions) {

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
