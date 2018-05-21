import {Action} from '@ngrx/store';
import {Holiday} from '../models/holiday';
import {CreateAction} from '../../core/actions/data.actions';


export const CREATE = '[holidays Page] create';
export const CREATE_SUCCESS = '[holidays] create success';
export const SELECT = '[holidays Page] select';

export const AF_ADDED = '[holidays Firestore] added';
export const AF_MODIFIED = '[holidays Firestore] modified';
export const AF_REMOVED = '[holidays Firestore] removed';


export class Create implements CreateAction {
  readonly type = CREATE;

  constructor(readonly payload: { record: Holiday }) {
  }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor() {
  }
}

export class Select implements Action {
  readonly type = SELECT;

  constructor(readonly payload: { id: string }) {
  }
}

export class AfAdded implements CreateAction {
  readonly type = AF_ADDED;

  constructor(readonly payload: { record: Holiday }) {
  }
}

export class AfModified implements Action {
  readonly type = AF_MODIFIED;

  constructor(readonly payload: { record: Partial<Holiday> }) {
  }
}

export class AfRemoved implements Action {
  readonly type = AF_REMOVED;

  constructor(readonly payload: { record: Holiday }) {
  }
}

export type HolidayActions =
  Create |
  Select |
  AfAdded |
  AfModified |
  AfRemoved;
