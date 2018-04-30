import {now} from 'moment';

export interface Holiday {
  readonly id: string;
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
