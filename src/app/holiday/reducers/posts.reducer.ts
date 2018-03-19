import * as actions from '../actions/post.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Post} from '../models/post';

export interface State extends EntityState<Post> {
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({});

export function reducer(state: State = initialState,
                        action: actions.PostActions) {

  switch (action.type) {
    case actions.CREATE:
    case actions.AF_ADDED: {
      return adapter.addOne(action.payload.post, state);
    }

    case actions.AF_REMOVED: {
      return adapter.removeOne(action.payload.post.id, state);
    }

    case actions.AF_MODIFIED: {
      return adapter.updateOne({
        id: action.payload.post.id,
        changes: action.payload.post
      }, state);
    }

    default: {
      return state;
    }
  }
}
