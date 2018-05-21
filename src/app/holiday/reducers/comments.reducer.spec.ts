import {MbComment, newTestComment} from '../models/comment';
import {reducer, State} from './comments.reducer';
import * as actions from '../actions/comment.actions';

describe('comment reducer', () => {
  describe('removed', () => {
    it('should remove existing comment', () => {
      const removedComment = newTestComment('removedId');
      const anotherComment = newTestComment('otherId');

      const state: State = {
        ids: ['removedId', 'otherId'],
        entities: {removedId: removedComment, otherId: anotherComment}
      };

      const action = new actions.AfRemoved({record: removedComment});
      const result = reducer(state, action);

      expect(result.ids).toContain('otherId');
      expect(result.entities.otherId).toEqual(anotherComment);
      expect(result.ids).not.toContain('removedId');
      expect(result.entities.removedId).toBeUndefined();
    });
  });

  describe('added', () => {
    it('should add new comments', () => {
      const existingComment = newTestComment('existing');
      const addedComment = newTestComment('added');

      const state: State = {
        ids: ['existing'],
        entities: {existing: existingComment}
      };

      const action = new actions.AfAdded({record: addedComment});
      const result = reducer(state, action);

      expect(result.ids).toContain('added');
      expect(result.entities.added).toEqual(addedComment);
    });
  });

  describe('create', () => {
    it('should add new comments', () => {
      const existingComment = newTestComment('existing');
      const addedComment = newTestComment('added');

      const state: State = {
        ids: ['existing'],
        entities: {existing: existingComment}
      };

      const action = new actions.Create({record: addedComment});
      const result = reducer(state, action);

      expect(result.ids).toContain('added');
      expect(result.entities.added).toEqual(addedComment);
    });
  });

  describe('updated', () => {
    it('should modify existing comment', () => {
      const existingComment = newTestComment('existing');

      const modification: Partial<MbComment> = {
        id: 'existing',
        text: 'newText'
      };

      const state: State = {
        ids: ['existing'],
        entities: {existing: existingComment}
      };

      const action = new actions.AfModified({record: modification});

      const result = reducer(state, action);

      expect(result.entities.existing.text).toEqual('newText');
    });
  });
});
