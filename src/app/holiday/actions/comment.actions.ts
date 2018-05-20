import {Action} from '@ngrx/store';
import {MbComment} from '../models/comment';

export const CREATE         = '[comments CommentBox] create';
export const AF_ADDED       = '[comments Firestore] added';
export const AF_MODIFIED    = '[comments Firestore] modified';
export const AF_REMOVED     = '[comments Firestore] removed';


export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload: { comment: MbComment }) {
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
  AfAdded |
  AfModified |
  AfRemoved;

