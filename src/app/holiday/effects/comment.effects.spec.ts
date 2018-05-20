import {cold, hot} from 'jasmine-marbles';
import {Action} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {TestBed} from '@angular/core/testing';
import {AfAdded, Create} from '../actions/comment.actions';
import {firestoreServiceMocker, getActions, TestActions} from '../../test-support/stubs';
import {createChangeAction} from '../../test-support/functions';
import {CommentEffects} from './comment.effects';
import {MbComment, newTestComment} from '../models/comment';
import {Query, QueryStop, QueryStopped} from '../actions/holiday.actions';
import {FirestoreService} from '../services/firestore.service';
import {PersistRecord} from '../../core/actions/firestore.actions';

describe('CommentEffects', () => {
  let effects: CommentEffects;
  let actions$: TestActions;
  let firestoreService: jasmine.SpyObj<FirestoreService>;

  const someComment: MbComment = newTestComment('someId');

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
      const addedAction: Action = new AfAdded({comment: someComment});
      const commentChanges = cold('-a-', {a: createChangeAction('added', someComment)});
      const expected = cold('--a-', {a: {...addedAction}});

      firestoreService.observeUpdates.and.returnValue(commentChanges);

      expect(effects.query$).toBeObservable(expected);
    });

    it('should stop querying again', () => {
      const query: Action = new Query();
      const queryStop: Action = new QueryStop();
      actions$.stream = hot('-a-b-', {a: query, b: queryStop});

      const addedAction: Action = new AfAdded({comment: someComment});
      const commentChanges = cold('-a-', {a: createChangeAction('added', someComment)});
      const queryStopped: Action = new QueryStopped();

      const expected = cold('--ab', {a: {...addedAction}, b: queryStopped});

      firestoreService.observeUpdates.and.returnValue(commentChanges);

      expect(effects.query$).toBeObservable(expected);
    });
  });

  describe('create', () => {
    beforeEach(() => {
      const action: Action = new Create({comment: someComment});
      actions$.stream = hot('-a--', {a: action});
    });

    it('should persist the comment in firstore and report success', () => {
      const persistComment: Action = new PersistRecord({docPath: 'comments', record: someComment});
      const expected = cold('-a-', {a: persistComment});
      expect(effects.create$).toBeObservable(expected);
    });
  });
});
