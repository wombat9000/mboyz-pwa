import {cold, hot} from 'jasmine-marbles';
import {Action} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {TestBed} from '@angular/core/testing';
import {AfAdded, Create, CreateSuccess} from '../actions/post.actions';
import {PostEffects} from './post.effects';
import {firestoreServiceMocker, getActions, TestActions} from '../../test-support/stubs';
import {PostDTO} from '../models/post';
import {createChangeAction} from '../../test-support/functions';
import {FirestoreService} from '../services/firestore.service';
import {CreateAction, Query, QueryStop, QueryStopped} from '../../core/actions/data.actions';

describe('PostEffects', () => {
  let effects: PostEffects;
  let actions$: TestActions;
  let firestore: jasmine.SpyObj<FirestoreService>;

  const somePost: PostDTO = {
    id: 'someId',
    text: 'some text',
    authorId: 'author1',
    holidayId: 'someHolidayId',
    created: '1990'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostEffects,
        {provide: FirestoreService, useFactory: firestoreServiceMocker},
        {provide: Actions, useFactory: getActions},
      ]
    });

    effects = TestBed.get(PostEffects);
    actions$ = TestBed.get(Actions);
    firestore = TestBed.get(FirestoreService);
  });

  describe('query', () => {
    it('should map state changes into corresponding actions', () => {
      const action: Action = new Query();
      actions$.stream = hot('-a--', {a: action});

      const addedAction: CreateAction = new AfAdded({record: somePost});
      const postChanges = cold('-a-', {a: createChangeAction('added', somePost)});
      const expected = cold('--a-', {a: {...addedAction}});

      firestore.observeUpdates.and.returnValue(postChanges);

      expect(effects.query$).toBeObservable(expected);
      expect(firestore.observeUpdates).toHaveBeenCalledWith('posts');
    });

    it('should stop querying again', () => {
      const query: Action = new Query();
      const queryStop: Action = new QueryStop();
      actions$.stream = hot('-a-b-', {a: query, b: queryStop});

      const addedAction: CreateAction = new AfAdded({record: somePost});
      const postChanges = cold('-a-a-', {a: createChangeAction('added', somePost)});

      const queryStopped: Action = new QueryStopped();

      const expected = cold('--ab', {a: {...addedAction}, b: queryStopped});

      firestore.observeUpdates.and.returnValue(postChanges);

      expect(effects.query$).toBeObservable(expected);
    });
  });

  describe('create', () => {
    beforeEach(() => {
      const action: CreateAction = new Create({record: somePost});
      actions$.stream = hot('-a--', {a: action});
    });

    it('should persist the post in firstore and report success', () => {
      const createSuccess: Action = new CreateSuccess();
      const expected = cold('-a-', {a: createSuccess});
      expect(effects.create$).toBeObservable(expected);

      expect(firestore.save).toHaveBeenCalledWith('posts', somePost);
    });

    it('should report failure on error', () => {
      const error = cold('-#-');
      firestore.save.and.returnValue(error);

      const createFail: Action = new CreateSuccess();
      const expected = cold('-a-', {a: createFail});
      expect(effects.create$).toBeObservable(expected);

      expect(firestore.save).toHaveBeenCalledWith('posts', somePost);
    });
  });
});
