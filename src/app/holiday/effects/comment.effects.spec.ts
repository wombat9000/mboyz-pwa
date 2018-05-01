import {cold, hot} from 'jasmine-marbles';
import {Action} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {TestBed} from '@angular/core/testing';
import {AfAdded, Create, CreateSuccess} from '../actions/comment.actions';
import {commentFirestoreMocker, getActions, TestActions} from '../../test-support/stubs';
import {createChangeAction} from '../../test-support/functions';
import {CommentEffects} from './comment.effects';
import {CommentFirestore} from '../services/comment-firestore.service';
import {MbComment, newTestComment} from '../models/comment';
import {Query} from '../actions/holiday.actions';

describe('CommentEffects', () => {
  let effects: CommentEffects;
  let actions$: TestActions;
  let commentFirestore: jasmine.SpyObj<CommentFirestore>;

  const someComment: MbComment = newTestComment('someId');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentEffects,
        {provide: CommentFirestore, useFactory: commentFirestoreMocker},
        {provide: Actions, useFactory: getActions},
      ]
    });

    effects = TestBed.get(CommentEffects);
    actions$ = TestBed.get(Actions);
    commentFirestore = TestBed.get(CommentFirestore);
  });

  describe('query', () => {
    beforeEach(() => {
      const action: Action = new Query();
      actions$.stream = hot('-a--', {a: action});
    });

    it('should map state changes into corresponding actions', () => {
      const addedAction: Action = new AfAdded({comment: someComment});
      const commentChanges = cold('-a-', {a: createChangeAction('added', someComment)});
      const expected = cold('--a-', {a: {...addedAction}});

      commentFirestore.observeChangesFrom.and.returnValue(commentChanges);

      expect(effects.query$).toBeObservable(expected);
    });
  });

  describe('create', () => {
    beforeEach(() => {
      const action: Action = new Create({comment: someComment});
      actions$.stream = hot('-a--', {a: action});
    });

    it('should persist the comment in firstore and report success', () => {
      const createSuccess: Action = new CreateSuccess();
      const expected = cold('-a-', {a: createSuccess});
      expect(effects.create$).toBeObservable(expected);

      expect(commentFirestore.save).toHaveBeenCalledWith(someComment);
    });

    it('should report failure on error', () => {
      const error = cold('-#-');
      commentFirestore.save.and.returnValue(error);

      const createFail: Action = new CreateSuccess();
      const expected = cold('-a-', {a: createFail});
      expect(effects.create$).toBeObservable(expected);

      expect(commentFirestore.save).toHaveBeenCalledWith(someComment);
    });
  });
});
