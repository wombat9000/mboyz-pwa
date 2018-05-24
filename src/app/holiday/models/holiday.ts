import {now} from 'moment';
import {DbRecord} from './DbRecord';

export interface HolidayDTO extends DbRecord {
  readonly name: string;
  readonly postIds: string[]
  readonly created: string;
}

export function newTestHoliday(id: string): HolidayDTO {
  return {
    id: id,
    name: 'someName',
    postIds: ['somePostId'],
    created: now().toString()
  };
}
