import {Action} from '@ngrx/store';
import {Holiday} from '../model/holiday';


export const QUERY       = '[Holiday] query';
export const CREATE      = '[Holiday] created';
export const AF_ADDED    = '[Holiday] added';
export const AF_MODIFIED = '[Holiday] modified';
export const AF_REMOVED  = '[Holiday] removed';

// Initial query
export class Query implements Action {
  readonly type = QUERY;
  constructor() {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public holiday: Holiday) {}
}

// AngularFire2 StateChanges
export class AfAdded implements Action {
  readonly type = AF_ADDED;
  constructor(public holiday: Holiday) {}
}

export class AfModified implements Action {
  readonly type = AF_MODIFIED;
  constructor(public holiday: Holiday) {}
}

export class AfRemoved implements Action {
  readonly type = AF_REMOVED;
  constructor(public holiday: Holiday) {}
}

export type HolidayActions =
  Create |
  Query |
  AfAdded |
  AfModified |
  AfRemoved;
