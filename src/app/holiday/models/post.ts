import {DbRecord} from './DbRecord';

export interface PostDTO extends DbRecord {
  readonly text: string;
  readonly holidayId: string;
  readonly authorId: string;
  readonly created: string;
}
