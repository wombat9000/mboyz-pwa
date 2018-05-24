import * as actions from '../actions/post.actions';
import {reducer, State} from './posts.reducer';
import {PostDTO} from '../models/post';

describe('post reducer', () => {
  describe('removed', () => {
    it('should remove existing post', () => {
      const removedPost: PostDTO = {
        id: 'someId',
        text: 'someText',
        commentIds: [],
        holidayId: '',
        authorId: '',
        created: ''
      };

      const anotherPost: PostDTO = {
        id: 'otherId',
        text: 'someText',
        commentIds: [],
        holidayId: '',
        authorId: '',
        created: ''
      };

      const state: State = {
        ids: ['someId', 'anotherId'],
        entities: {someId: removedPost, anotherId: anotherPost}
      };

      const action = new actions.AfRemoved({record: removedPost});
      const result = reducer(state, action);

      expect(result.ids).toContain('anotherId');
      expect(result.entities.anotherId).toEqual(anotherPost);
      expect(result.ids).not.toContain('someId');
      expect(result.entities.removedId).toBeUndefined();
    });
  });

  describe('added', () => {
    it('should add new posts', () => {
      const existingPost: PostDTO = {
        id: 'someId',
        text: 'someText',
        commentIds: [],
        holidayId: '',
        authorId: '',
        created: ''
      };

      const addedPost: PostDTO = {
        id: 'addedId',
        text: 'someText',
        commentIds: [],
        holidayId: '',
        authorId: '',
        created: ''
      };

      const state: State = {
        ids: ['someId'],
        entities: {someId: existingPost}
      };

      const action = new actions.AfAdded({record: addedPost});
      const result = reducer(state, action);

      expect(result.ids).toContain('addedId');
      expect(result.entities.addedId).toEqual(addedPost);
    });
  });

  describe('create', () => {
    it('should add new posts', () => {
      const existingPost: PostDTO = {
        id: 'someId',
        text: 'someText',
        commentIds: [],
        holidayId: '',
        authorId: '',
        created: ''
      };

      const addedPost: PostDTO = {
        id: 'addedId',
        text: 'someText',
        commentIds: [],
        holidayId: '',
        authorId: '',
        created: ''
      };

      const state: State = {
        ids: ['someId'],
        entities: {someId: existingPost}
      };

      const action = new actions.Create({record: addedPost});
      const result = reducer(state, action);

      expect(result.ids).toContain('addedId');
      expect(result.entities.addedId).toEqual(addedPost);
    });
  });

  describe('updated', () => {
    it('should modify existing post', () => {
      const existingPost: PostDTO = {
        id: 'someId',
        text: 'someText',
        commentIds: [],
        holidayId: '',
        authorId: '',
        created: ''
      };

      const updatedPost: PostDTO = {
        id: 'someId',
        text: 'updatedText',
        commentIds: ['someId'],
        holidayId: '',
        authorId: '',
        created: ''
      };

      const state: State = {
        ids: ['someId'],
        entities: {someId: existingPost}
      };

      const action = new actions.AfModified({record: updatedPost});
      const result = reducer(state, action);

      expect(result.entities.someId).toEqual(updatedPost);
    });
  });
});
