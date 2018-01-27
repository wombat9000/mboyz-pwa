import {AuthActions, AuthActionTypes} from '../actions/auth.actions';

export interface State {
  pending: boolean;
}

export const initialState: State = {
  pending: false
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.FB_LOGIN: {
      return {pending: true};
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const getPending = (state: State) => state.pending;

