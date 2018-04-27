import {TestBed} from '@angular/core/testing';

import {HolidayService} from './holiday.service';

describe('HolidayService', () => {
  let testee: HolidayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HolidayService
      ]
    });

    testee = TestBed.get(HolidayService);
  });

});
