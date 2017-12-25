import {TestBed} from '@angular/core/testing';

import {Holiday, HolidayService} from './holiday.service';
import {HolidayFirestore} from './holiday-firestore.service';
import {holidayFirestoreMock} from '../test-support/stubs';
import {Observable} from 'rxjs/Observable';

describe('HolidayService', () => {
  let testee: HolidayService;
  let holidayFirestore: jasmine.SpyObj<HolidayFirestore>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HolidayService,
        {provide: HolidayFirestore, useValue: holidayFirestoreMock}
      ]
    });

    testee = TestBed.get(HolidayService);
    holidayFirestore = TestBed.get(HolidayFirestore);
  });

  describe('create', () => {
    it('should save new holiday in firestore', async() => {
      const someHoliday = new Holiday('someId', '', []);
      await testee.create(someHoliday);
      expect(holidayFirestore.save).toHaveBeenCalledWith(someHoliday);
    });
  });

  describe('find', () => {
    it('should find holiday by id from firestore', (done) => {
      const holidayToFind = new Holiday('findMe!', '', []);
      holidayFirestore.observeById.and.returnValue(Observable.of(holidayToFind));

      const holiday = testee.findById('findMe!');

      expect(holidayFirestore.observeById).toHaveBeenCalledWith(holidayToFind.id);

      holiday.subscribe(it => {
        expect(it).toBe(holidayToFind);
        done();
      });
    });
  });
});
