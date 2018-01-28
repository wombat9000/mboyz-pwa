import {AuthActions, AuthActionTypes} from '../actions/auth.actions';

export interface State {
  error?: string;
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
    case AuthActionTypes.LOGIN_FAILURE: {
      return {pending: false, error: action.payload.error};
    }
    default: {
      return state;
    }
  }
}

export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;

