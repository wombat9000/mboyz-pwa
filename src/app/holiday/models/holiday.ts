import {now} from 'moment';
import {DbRecord} from './DbRecord';

export interface Holiday extends DbRecord {
  readonly name: string;
  readonly created: string;
}

export function newTestHoliday(id: string): Holiday {
  return {
    id: id,
    name: 'someName',
    created: now().toString()
  };
}
