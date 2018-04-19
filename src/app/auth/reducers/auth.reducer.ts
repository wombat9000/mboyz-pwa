import {MtravelUser} from '../services/auth.service';
import {AuthActions, AuthActionTypes} from '../actions/auth.actions';

export interface State {
  loggedIn: boolean;
  user: MtravelUser | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.AUTHORISE:
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        loggedIn: true,
        user: action.payload.user,
      };
    }

    case AuthActionTypes.NOT_AUTHENTICATED: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;
export const isLoggedIn = (state: State) => state.loggedIn;
