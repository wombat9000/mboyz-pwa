import {TestBed} from '@angular/core/testing';
import {HolidayEffects} from './holiday.effects';
import {getActions, holidayFirestoreMocker, TestActions} from '../../test-support/stubs';
import {AfAdded, Create, Query} from '../actions/holiday.actions';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {cold, hot} from 'jasmine-marbles';
import {Actions} from '@ngrx/effects';
import {createChangeAction} from '../../test-support/functions';
import {HolidayFirestore} from '../services/holiday-firestore.service';

describe('Holiday Effects', () => {
  const actions = new ReplaySubject(1);

  let effects: HolidayEffects;
  let actions$: TestActions;
  let holidayFS: jasmine.SpyObj<HolidayFirestore>;

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
        {provide: HolidayFirestore, useFactory: holidayFirestoreMocker},
        {provide: Actions, useFactory: getActions},
      ]
    });

    actions$ = TestBed.get(Actions);

    effects = TestBed.get(HolidayEffects);
    holidayFS = TestBed.get(HolidayFirestore);
  });

  describe('create', () => {
    it('should save holiday with service', () => {
      const action = new Create(someHoliday);
      holidayFS.save.and.returnValue(Promise.resolve());
      actions.next(action);

      effects.create$.subscribe(() => {
        expect(holidayFS.save).toHaveBeenCalledWith(someHoliday);
      });
    });
  });

  describe('query', () => {
    beforeEach(() => {
      const action: Action = new Query();
      actions$.stream = hot('-a--', {a: action});
    });

    it('should map state changes into corresponding actions', () => {
      const holidayChanges = cold('-a-', {a: createChangeAction('added', someHoliday)});

      const addedAction: Action = new AfAdded(someHoliday);
      const expected = cold('--a-', {a: {...addedAction}});

      holidayFS.observeChanges.and.returnValue(holidayChanges);

      expect(effects.query$).toBeObservable(expected);
    });
  });
});
