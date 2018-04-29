import * as actions from '../actions/comment.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {MbComment} from '../models/comment';

export interface State extends EntityState<MbComment> {
}

export const adapter: EntityAdapter<MbComment> = createEntityAdapter<MbComment>({
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({});

export function reducer(state: State = initialState,
                        action: actions.CommentActions) {

  switch (action.type) {
    case actions.CREATE:
    case actions.AF_ADDED: {
      return adapter.addOne(action.payload.comment, state);
    }

    case actions.AF_REMOVED: {
      return adapter.removeOne(action.payload.comment.id, state);
    }

    case actions.AF_MODIFIED: {
      return adapter.updateOne({
        id: action.payload.comment.id,
        changes: action.payload.comment
      }, state);
    }

    default: {
      return state;
    }
  }
}
