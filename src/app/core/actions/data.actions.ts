import {Action} from '@ngrx/store';
import {DbRecord} from '../../holiday/models/DbRecord';

export const QUERY       = '[App] query';
export const QUERY_STOP  = '[App] query stop';
export const QUERY_STOPPED  = '[App] query stopped';

export interface CreateAction extends Action {
  readonly type: string;
  readonly payload: { readonly record: DbRecord };
}

export class Query implements Action {
  readonly type = QUERY;
  constructor() {}
}

export class QueryStop implements Action {
  readonly type = QUERY_STOP;
  constructor() {}
}

export class QueryStopped implements Action {
  readonly type = QUERY_STOPPED;
  constructor() {}
}

export type DataActions =
  CreateAction |
  Query |
  QueryStop |
  QueryStopped;
