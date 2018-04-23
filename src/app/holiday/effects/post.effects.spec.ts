import {cold, hot} from 'jasmine-marbles';
import {Action} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {TestBed} from '@angular/core/testing';
import {AfAdded, Query, Create, CreateSuccess} from '../actions/post.actions';
import {PostEffects} from './post.effects';
import {getActions, postFirestoreMocker, TestActions} from '../../test-support/stubs';
import {Post} from '../models/post';
import {PostFirestore} from '../services/post-firestore.service';
import {createChangeAction} from '../../test-support/functions';

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
    beforeEach(() => {
      const action: Action = new Query({holidayId: 'someHolidayId'});
      actions$.stream = hot('-a--', {a: action});
    });

    it('should map state changes into corresponding actions', () => {
      const addedAction: Action = new AfAdded({post: somePost});
      const postChanges = cold('-a-', {a: createChangeAction('added', somePost)});
      const expected = cold('--a-', {a: {...addedAction}});

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
