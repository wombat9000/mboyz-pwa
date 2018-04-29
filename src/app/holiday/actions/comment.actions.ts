import {Action} from '@ngrx/store';
import {MbComment} from '../models/comment';

export const QUERY          = '[Comment] query';
export const CREATE         = '[Comment] create';
export const CREATE_SUCCESS = '[Comment] create success';
export const AF_ADDED       = '[Comment] added';
export const AF_MODIFIED    = '[Comment] modified';
export const AF_REMOVED     = '[Comment] removed';

export class Query implements Action {
  readonly type = QUERY;

  constructor() {
  }
}

export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload: { comment: MbComment }) {
  }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor() {
  }
}

export class AfAdded implements Action {
  readonly type = AF_ADDED;

  constructor(readonly payload: { comment: MbComment }) {
  }
}

export class AfModified implements Action {
  readonly type = AF_MODIFIED;

  constructor(readonly payload: { comment: Partial<MbComment> }) {
  }
}

export class AfRemoved implements Action {
  readonly type = AF_REMOVED;

  constructor(readonly payload: { comment: MbComment }) {
  }
}

export type CommentActions =
  Create |
  Query |
  AfAdded |
  AfModified |
  AfRemoved;

