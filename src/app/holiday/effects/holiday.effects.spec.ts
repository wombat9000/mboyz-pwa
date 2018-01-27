import {TestBed} from '@angular/core/testing';
import {HolidayEffects} from './holiday.effects';
import {HolidayService} from '../holiday.service';
import {holidayServiceMocker} from '../../test-support/stubs';
import {Create} from '../actions/holiday.actions';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {provideMockActions} from '@ngrx/effects/testing';

describe('Holiday Effects', () => {
  const actions = new ReplaySubject(1);

  let effects: HolidayEffects;
  let holidayService: jasmine.SpyObj<HolidayService>;

  const someHoliday = {
    id: 'someId',
    name: 'someName'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HolidayEffects,
        provideMockActions(() => actions),
        {provide: HolidayService, useFactory: holidayServiceMocker}
      ]
    });
    effects = TestBed.get(HolidayEffects);
    holidayService = TestBed.get(HolidayService);
  });

  describe('create', () => {
    it('should save holiday with service', () => {
      const action = new Create(someHoliday);
      holidayService.create.and.returnValue(Promise.resolve());
      actions.next(action);

      effects.create$.subscribe(result => {
        expect(holidayService.create).toHaveBeenCalledWith(someHoliday);
      });
    });
  });
});
