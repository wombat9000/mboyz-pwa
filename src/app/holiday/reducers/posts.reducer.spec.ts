import * as actions from '../actions/post.actions';
import {reducer, State} from './posts.reducer';
import {Post} from '../models/post';

describe('post reducer', () => {
  describe('removed', () => {
    it('should remove existing post', () => {
      const removedPost: Post = {
        id: 'someId',
        text: 'someText',
        holidayId: '',
        authorId: '',
        created: ''
      };

      const anotherPost: Post = {
        id: 'otherId',
        text: 'someText',
        holidayId: '',
        authorId: '',
        created: ''
      };

      const state: State = {
        ids: ['someId', 'anotherId'],
        entities: {someId: removedPost, anotherId: anotherPost}
      };

      const action = new actions.AfRemoved({post: removedPost});
      const result = reducer(state, action);

      expect(result.ids).toContain('anotherId');
      expect(result.entities.anotherId).toEqual(anotherPost);
      expect(result.ids).not.toContain('someId');
      expect(result.entities.removedId).toBeUndefined();
    });
  });

  describe('added', () => {
    it('should add new posts', () => {
      const existingPost: Post = {
        id: 'someId',
        text: 'someText',
        holidayId: '',
        authorId: '',
        created: ''
      };

      const addedPost: Post = {
        id: 'addedId',
        text: 'someText',
        holidayId: '',
        authorId: '',
        created: ''
      };

      const state: State = {
        ids: ['someId'],
        entities: {someId: existingPost}
      };

      const action = new actions.AfAdded({post: addedPost});
      const result = reducer(state, action);

      expect(result.ids).toContain('addedId');
      expect(result.entities.addedId).toEqual(addedPost);
    });
  });

  describe('create', () => {
    it('should add new posts', () => {
      const existingPost: Post = {
        id: 'someId',
        text: 'someText',
        holidayId: '',
        authorId: '',
        created: ''
      };

      const addedPost: Post = {
        id: 'addedId',
        text: 'someText',
        holidayId: '',
        authorId: '',
        created: ''
      };

      const state: State = {
        ids: ['someId'],
        entities: {someId: existingPost}
      };

      const action = new actions.Create({post: addedPost});
      const result = reducer(state, action);

      expect(result.ids).toContain('addedId');
      expect(result.entities.addedId).toEqual(addedPost);
    });
  });

  describe('updated', () => {
    it('should modify existing post', () => {
      const existingPost: Post = {
        id: 'someId',
        text: 'someText',
        holidayId: '',
        authorId: '',
        created: ''
      };

      const updatedPost: Post = {
        id: 'someId',
        text: 'updatedText',
        holidayId: '',
        authorId: '',
        created: ''
      };

      const state: State = {
        ids: ['someId'],
        entities: {someId: existingPost}
      };

      const action = new actions.AfModified({post: updatedPost});
      const result = reducer(state, action);

      expect(result.entities.someId).toEqual(updatedPost);
    });
  });
});
