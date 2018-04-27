import {Action} from '@ngrx/store';
import {Holiday} from '../models/holiday';


export const QUERY       = '[Holiday] query';
export const CREATE      = '[Holiday] create';
export const SELECT      = '[Holiday] select';

export const AF_ADDED    = '[Holiday] added';
export const AF_MODIFIED = '[Holiday] modified';
export const AF_REMOVED  = '[Holiday] removed';

export class Query implements Action {
  readonly type = QUERY;
  constructor() {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(readonly holiday: Holiday) {}
}

export class Select implements Action {
  readonly type = SELECT;
  constructor(readonly payload: { id: string }) {}
}

// AngularFire2 StateChanges
export class AfAdded implements Action {
  readonly type = AF_ADDED;
  constructor(readonly holiday: Holiday) {}
}

export class AfModified implements Action {
  readonly type = AF_MODIFIED;
  constructor(readonly holiday: Partial<Holiday>) {}
}

export class AfRemoved implements Action {
  readonly type = AF_REMOVED;
  constructor(readonly holiday: Holiday) {}
}

export type HolidayActions =
  Create |
  Select |
  Query |
  AfAdded |
  AfModified |
  AfRemoved;
