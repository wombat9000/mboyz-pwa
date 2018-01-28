import {Action} from '@ngrx/store';
import {User} from '../services/auth.service';

export enum AuthActionTypes {
  GET_USER =          '[Auth] Get User',
  FB_LOGIN =          '[Auth] FbLogin',
  LOGOUT =            '[Auth] Logout',
  LOGOUT_SUCCESS =    '[Auth] Logout Success',
  LOGIN_SUCCESS =     '[Auth] Login Success',
  LOGIN_FAILURE =     '[Auth] Login Failure',
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GET_USER;
}

export class FbLogin implements Action {
  readonly type = AuthActionTypes.FB_LOGIN;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { user: User }) {}
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: {error: string}) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions =
  | GetUser
  | FbLogin
  | LoginSuccess
  | LoginFailure
  | Logout
  | LogoutSuccess;
