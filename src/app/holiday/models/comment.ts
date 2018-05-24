import {DbRecord} from './DbRecord';

export interface CommentDTO extends DbRecord {
  readonly text: string;
  readonly postId: string;
  readonly holidayId: string;
  readonly authorId: string;
  readonly created: string;
}

export function asComment(data: any): CommentDTO {
  return {
    id: data.id,
    text: data.text,
    authorId: data.authorId,
    postId: data.postId,
    holidayId: data.holidayId,
    created: data.created
  };
}

export function newTestComment(id: string): CommentDTO {
  return {
    id: id,
    text: 'someText',
    authorId: 'someAuthor',
    postId: 'somePostId',
    holidayId: 'someHolidayId',
    created: 'someCreatedDate'
  };
}
