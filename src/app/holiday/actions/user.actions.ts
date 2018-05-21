import {Action} from '@ngrx/store';
import {CreateAction} from '../../core/actions/data.actions';
import {MtravelUser} from '../../auth/services/auth.service';

export const CREATE = '[users PostboxComponent] create';
export const CREATE_SUCCESS = '[users App] create success';
export const AF_ADDED = '[users Firestore] added';
export const AF_MODIFIED = '[users Firestore] modified';
export const AF_REMOVED = '[users Firestore] removed';

export class Create implements CreateAction {
  readonly type = CREATE;

  constructor(public readonly payload: { record: MtravelUser }) {
  }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor() {
  }
}

export class AfAdded implements CreateAction {
  readonly type = AF_ADDED;

  constructor(public readonly payload: { record: MtravelUser }) {
  }
}

export class AfModified implements Action {
  readonly type = AF_MODIFIED;

  constructor(public readonly payload: { record: Partial<MtravelUser> }) {
  }
}

export class AfRemoved implements Action {
  readonly type = AF_REMOVED;

  constructor(public readonly payload: { record: MtravelUser }) {
  }
}

export type MtravelUserActions =
  Create |
  AfAdded |
  AfModified |
  AfRemoved;

