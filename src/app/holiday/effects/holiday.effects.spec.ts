import {TestBed} from '@angular/core/testing';
import {HolidayEffects} from './holiday.effects';
import {firestoreServiceMocker, getActions, TestActions} from '../../test-support/stubs';
import {AfAdded, Create, Query, QueryStop, QueryStopped} from '../actions/holiday.actions';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {cold, hot} from 'jasmine-marbles';
import {Actions} from '@ngrx/effects';
import {createChangeAction} from '../../test-support/functions';
import {FirestoreService} from '../services/comment-firestore.service';

describe('Holiday Effects', () => {
  const actions = new ReplaySubject(1);

  let effects: HolidayEffects;
  let actions$: TestActions;
  let firestoreService: jasmine.SpyObj<FirestoreService>;

  const someHoliday = {
    id: 'someId',
    name: 'someName',
    created: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HolidayEffects,
        provideMockActions(() => actions),
        {provide: FirestoreService, useFactory: firestoreServiceMocker},
        {provide: Actions, useFactory: getActions},
      ]
    });

    actions$ = TestBed.get(Actions);

    effects = TestBed.get(HolidayEffects);
    firestoreService = TestBed.get(FirestoreService);
  });

  describe('create', () => {
    it('should save holiday with service', () => {
      const action = new Create(someHoliday);
      firestoreService.save.and.returnValue(Promise.resolve());
      actions.next(action);

      effects.create$.subscribe(() => {
        expect(firestoreService.save).toHaveBeenCalledWith('holidays', someHoliday);
      });
    });
  });

  describe('query', () => {
    it('should map state changes into corresponding actions', () => {
      const action: Action = new Query();
      actions$.stream = hot('-a--', {a: action});
      const holidayChanges = cold('-a-', {a: createChangeAction('added', someHoliday)});

      const addedAction: Action = new AfAdded(someHoliday);
      const expected = cold('--a-', {a: {...addedAction}});

      firestoreService.observeUpdates.and.returnValue(holidayChanges);

      expect(effects.query$).toBeObservable(expected);
      expect(firestoreService.observeUpdates).toHaveBeenCalledWith('holidays');
    });

    it('should stop querying again', () => {
      const query: Action = new Query();
      const queryStop: Action = new QueryStop();
      actions$.stream = hot('-a-b-', {a: query, b: queryStop});
      const holidayChanges = cold('-a-a-', {a: createChangeAction('added', someHoliday)});

      const addedAction: Action = new AfAdded(someHoliday);
      const queryStopped: Action = new QueryStopped();
      const expected = cold('--ab', {a: {...addedAction}, b: queryStopped});

      firestoreService.observeUpdates.and.returnValue(holidayChanges);

      expect(effects.query$).toBeObservable(expected);
    });
  });
});
