import {Action} from '@ngrx/store';
import {User} from '../services/auth.service';

export enum AuthActionTypes {
  AUTHORISE = '[Auth] Authorise',
  UNAUTHORISED = '[Auth] Unauthorised',
  FACEBOOK_LOGIN = '[Auth] FacebookLogin',
  LOGOUT = '[Auth] Logout',
  NOT_AUTHENTICATED = '[Auth] Not Authenticated',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
}

export class Unauthorised implements Action {
  readonly type = AuthActionTypes.UNAUTHORISED;
  constructor(public payload: { url: string }) {}
}

export class Authorise implements Action {
  readonly type = AuthActionTypes.AUTHORISE;
  constructor(public payload: { user: User, url: string }) {}
}

export class FacebookLogin implements Action {
  readonly type = AuthActionTypes.FACEBOOK_LOGIN;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { user: User }) {}
}

export class NotAuthenticated implements Action {
  readonly type = AuthActionTypes.NOT_AUTHENTICATED;
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions =
  | Unauthorised
  | Authorise
  | FacebookLogin
  | LoginSuccess
  | LoginFailure
  | Logout
  | NotAuthenticated;
