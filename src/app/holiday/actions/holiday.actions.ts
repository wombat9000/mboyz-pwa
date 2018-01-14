import {Action} from '@ngrx/store';
import {Holiday} from '../model/holiday';


export const QUERY    = '[Holiday] query pizzas';
export const ADDED    = '[Holiday] added';
export const MODIFIED = '[Holiday] modified';
export const REMOVED  = '[Holiday] removed';
export const CREATE  = '[Holiday] created';

// Initial query
export class Query implements Action {
  readonly type = QUERY;
  constructor() {}
}
// AngularFire2 StateChanges
export class Added implements Action {
  readonly type = ADDED;
  constructor(public holiday: Holiday) {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public holiday: Holiday) {}
}

export class Modified implements Action {
  readonly type = MODIFIED;
  constructor(public holiday: Holiday) {}
}

export class Removed implements Action {
  readonly type = REMOVED;
  constructor(public holiday: Holiday) {}
}


export type HolidayActions =
  Create |
  Query |
  Added |
  Modified |
  Removed;
