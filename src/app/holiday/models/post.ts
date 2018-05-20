import {DbRecord} from './DbRecord';

export interface Post extends DbRecord {
  readonly text: string;
  readonly holidayId: string;
  readonly authorId: string;
  readonly created: string;
}
