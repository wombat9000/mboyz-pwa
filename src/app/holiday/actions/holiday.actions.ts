import {Action} from '@ngrx/store';
import {Holiday} from '../holiday.service';


export const CREATE = '[Holiday] Create';

export class Create implements Action {
  readonly type: string = CREATE;

  constructor(public holiday: Holiday) {
  }
}


export type HolidayActions
  = Create;
