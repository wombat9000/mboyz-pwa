import {Action} from '@ngrx/store';
import {Post} from '../models/post';

export const QUERY = '[Post] query';
export const CREATE = '[Post] create';
export const CREATE_SUCCESS = '[Post] create success';
export const AF_ADDED = '[Post] added';
export const AF_MODIFIED = '[Post] modified';
export const AF_REMOVED = '[Post] removed';

export class Query implements Action {
  readonly type = QUERY;

  constructor(public payload: { holidayId: string }) {
  }
}

export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload: { post: Post }) {
  }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor() {
  }
}

export class AfAdded implements Action {
  readonly type = AF_ADDED;

  constructor(public payload: { post: Post }) {
  }
}

export class AfModified implements Action {
  readonly type = AF_MODIFIED;

  constructor(public payload: { post: Post }) {
  }
}

export class AfRemoved implements Action {
  readonly type = AF_REMOVED;

  constructor(public payload: { post: Post }) {
  }
}

export type PostActions =
  Create |
  Query |
  AfAdded |
  AfModified |
  AfRemoved;

