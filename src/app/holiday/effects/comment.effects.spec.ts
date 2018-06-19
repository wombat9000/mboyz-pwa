import {cold, hot} from 'jasmine-marbles';
import {Action} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {TestBed} from '@angular/core/testing';
import {AfAdded} from '../actions/comment.actions';
import {firestoreServiceMocker, getActions, TestActions} from '../../test-support/stubs';
import {createChangeAction} from '../../test-support/functions';
import {CommentEffects} from './comment.effects';
import {CommentDTO, newTestComment} from '../models/comment';
import {FirestoreService} from '../services/firestore.service';
import {Query, QueryStop, QueryStopped} from '../../core/actions/data.actions';

describe('CommentEffects', () => {
  let effects: CommentEffects;
  let actions$: TestActions;
  let firestoreService: any;

  const someComment: CommentDTO = newTestComment('someId');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentEffects,
        {provide: FirestoreService, useFactory: firestoreServiceMocker},
        {provide: Actions, useFactory: getActions},
      ]
    });

    effects = TestBed.get(CommentEffects);
    actions$ = TestBed.get(Actions);
    firestoreService = TestBed.get(FirestoreService);
  });

  describe('query', () => {
    it('should map state changes into corresponding actions', () => {
      const action: Action = new Query();
      actions$.stream = hot('-a--', {a: action});
      const addedAction: Action = new AfAdded({record: someComment});
      const commentChanges = cold('-a-', {a: createChangeAction('added', someComment)});
      const expected = cold('--a-', {a: {...addedAction}});

      firestoreService.observeUpdates.mockReturnValue(commentChanges);

      expect(effects.query$).toBeObservable(expected);
    });

    it('should stop querying again', () => {
      const query: Action = new Query();
      const queryStop: Action = new QueryStop();
      actions$.stream = hot('-a-b-', {a: query, b: queryStop});

      const addedAction: Action = new AfAdded({record: someComment});
      const commentChanges = cold('-a-', {a: createChangeAction('added', someComment)});
      const queryStopped: Action = new QueryStopped();

      const expected = cold('--ab', {a: {...addedAction}, b: queryStopped});

      firestoreService.observeUpdates.mockReturnValue(commentChanges);

      expect(effects.query$).toBeObservable(expected);
    });
  });
});
