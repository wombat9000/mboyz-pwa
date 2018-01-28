import {Action} from '@ngrx/store';
import {User} from '../services/auth.service';

export enum AuthActionTypes {
  FB_LOGIN =      '[Auth] FbLogin',
  LOGOUT =        '[Auth] Logout',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
}


export class FbLogin implements Action {
  readonly type = AuthActionTypes.FB_LOGIN;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { user: User }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions =
  | FbLogin
  | LoginSuccess
  | LoginFailure
  | Logout;
