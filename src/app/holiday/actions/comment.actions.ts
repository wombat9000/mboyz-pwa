import {Action} from '@ngrx/store';
import {MbComment} from '../models/comment';
import {CreateAction} from '../../core/actions/data.actions';

export const CREATE         = '[comments CommentBox] create';
export const CREATE_SUCCESS = '[comments] create success';

export const AF_ADDED       = '[comments Firestore] added';
export const AF_MODIFIED    = '[comments Firestore] modified';
export const AF_REMOVED     = '[comments Firestore] removed';


export class Create implements CreateAction {
  readonly type = CREATE;

  constructor(public payload: { record: MbComment }) {
  }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor() {
  }
}

export class AfAdded implements CreateAction {
  readonly type = AF_ADDED;

  constructor(readonly payload: { record: MbComment }) {
  }
}

export class AfModified implements Action {
  readonly type = AF_MODIFIED;

  constructor(readonly payload: { record: Partial<MbComment> }) {
  }
}

export class AfRemoved implements Action {
  readonly type = AF_REMOVED;

  constructor(readonly payload: { record: MbComment }) {
  }
}

export type CommentActions =
  Create |
  CreateSuccess |
  AfAdded |
  AfModified |
  AfRemoved;

