import {cold, hot} from 'jasmine-marbles';
import {Action} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {TestBed} from '@angular/core/testing';
import {AfAdded, Create, CreateSuccess} from '../actions/post.actions';
import {PostEffects} from './post.effects';
import {getActions, postFirestoreMocker, TestActions} from '../../test-support/stubs';
import {Post} from '../models/post';
import {PostFirestore} from '../services/post-firestore.service';
import {createChangeAction} from '../../test-support/functions';
import {Query, QueryStop, QueryStopped} from '../actions/holiday.actions';

describe('PostEffects', () => {
  let effects: PostEffects;
  let actions$: TestActions;
  let postFirestore: jasmine.SpyObj<PostFirestore>;

  const somePost: Post = {
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
        {provide: PostFirestore, useFactory: postFirestoreMocker},
        {provide: Actions, useFactory: getActions},
      ]
    });

    effects = TestBed.get(PostEffects);
    actions$ = TestBed.get(Actions);
    postFirestore = TestBed.get(PostFirestore);
  });

  describe('query', () => {
    it('should map state changes into corresponding actions', () => {
      const action: Action = new Query();
      actions$.stream = hot('-a--', {a: action});

      const addedAction: Action = new AfAdded({post: somePost});
      const postChanges = cold('-a-', {a: createChangeAction('added', somePost)});
      const expected = cold('--a-', {a: {...addedAction}});

      postFirestore.observeChanges.and.returnValue(postChanges);

      expect(effects.query$).toBeObservable(expected);
    });

    it('should stop querying again', () => {
      const query: Action = new Query();
      const queryStop: Action = new QueryStop();
      actions$.stream = hot('-a-b-', {a: query, b: queryStop});

      const addedAction: Action = new AfAdded({post: somePost});
      const postChanges = cold('-a-a-', {a: createChangeAction('added', somePost)});

      const queryStopped: Action = new QueryStopped();

      const expected = cold('--ab', {a: {...addedAction}, b: queryStopped});

      postFirestore.observeChanges.and.returnValue(postChanges);

      expect(effects.query$).toBeObservable(expected);
    });
  });

  describe('create', () => {
    beforeEach(() => {
      const action: Action = new Create({post: somePost});
      actions$.stream = hot('-a--', {a: action});
    });

    it('should persist the post in firstore and report success', () => {
      const createSuccess: Action = new CreateSuccess();
      const expected = cold('-a-', {a: createSuccess});
      expect(effects.create$).toBeObservable(expected);

      expect(postFirestore.save).toHaveBeenCalledWith(somePost);
    });

    it('should report failure on error', () => {
      const error = cold('-#-');
      postFirestore.save.and.returnValue(error);

      const createFail: Action = new CreateSuccess();
      const expected = cold('-a-', {a: createFail});
      expect(effects.create$).toBeObservable(expected);

      expect(postFirestore.save).toHaveBeenCalledWith(somePost);
    });
  });
});
