import {AppBarActions, SET_TITLE} from '../actions/app-bar.actions';

export interface State {
  title: string;
}

export const initialState: State = {
  title: ''
};

export function reducer(state: State = initialState,
                        action: AppBarActions): State {
  switch (action.type) {
    case SET_TITLE: {
      return {
        title: action.payload.newTitle
      };
    }
    default: {
      return state;
    }
  }
}

export const getTitle = (state: State) => state.title;
