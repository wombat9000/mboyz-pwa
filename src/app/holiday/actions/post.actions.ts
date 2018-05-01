import {Action} from '@ngrx/store';
import {Post} from '../models/post';

export const CREATE = '[Post PostboxComponent] create';
export const CREATE_SUCCESS = '[Post App] create success';
export const AF_ADDED = '[Post Firestore] added';
export const AF_MODIFIED = '[Post Firestore] modified';
export const AF_REMOVED = '[Post Firestore] removed';

export class Create implements Action {
  readonly type = CREATE;

  constructor(public readonly payload: { post: Post }) {
  }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor() {
  }
}

export class AfAdded implements Action {
  readonly type = AF_ADDED;

  constructor(public readonly payload: { post: Post }) {
  }
}

export class AfModified implements Action {
  readonly type = AF_MODIFIED;

  constructor(public readonly payload: { post: Post }) {
  }
}

export class AfRemoved implements Action {
  readonly type = AF_REMOVED;

  constructor(public readonly payload: { post: Post }) {
  }
}

export type PostActions =
  Create |
  AfAdded |
  AfModified |
  AfRemoved;

