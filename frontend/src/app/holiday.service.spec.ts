import {TestBed} from '@angular/core/testing';

import {Holiday, HolidayService} from './holiday.service';

describe('HolidayService', () => {
  let testee: HolidayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HolidayService]
    });

    testee = TestBed.get(HolidayService);
  });

  describe('create', () => {
    it('should provide the new holiday', () => {
      const someHoliday = new Holiday('someId', '', []);
      let holidays = testee.getHolidays();
      expect(holidays).not.toContain(someHoliday);

      testee.create(someHoliday);
      holidays = testee.getHolidays();
      expect(holidays).toContain(someHoliday);
    });
  });

  describe('find', () => {
    it('should find holiday by id', () => {
      const idToFind = 'findMe!';
      const holidayToFind = new Holiday(idToFind, '', []);
      testee.create(holidayToFind);

      const holiday = testee.findById('findMe!');
      expect(holiday).toBe(holidayToFind);
    });
  });
});
