import {Action} from '@ngrx/store';
import {Post} from '../models/post';
import {CreateAction} from '../../core/actions/data.actions';

export const CREATE = '[posts PostboxComponent] create';
export const CREATE_SUCCESS = '[posts App] create success';
export const AF_ADDED = '[posts Firestore] added';
export const AF_MODIFIED = '[posts Firestore] modified';
export const AF_REMOVED = '[posts Firestore] removed';

export class Create implements CreateAction {
  readonly type = CREATE;

  constructor(public readonly payload: { record: Post }) {
  }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor() {
  }
}

export class AfAdded implements CreateAction {
  readonly type = AF_ADDED;

  constructor(public readonly payload: { record: Post }) {
  }
}

export class AfModified implements Action {
  readonly type = AF_MODIFIED;

  constructor(public readonly payload: { record: Partial<Post> }) {
  }
}

export class AfRemoved implements Action {
  readonly type = AF_REMOVED;

  constructor(public readonly payload: { record: Post }) {
  }
}

export type PostActions =
  Create |
  AfAdded |
  AfModified |
  AfRemoved;

