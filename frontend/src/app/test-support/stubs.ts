import {HolidayService} from '../holiday.service';

export class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

export const holidayServiceMock: jasmine.SpyObj<HolidayService> = jasmine.createSpyObj('HolidayService',
  ['create', 'getHolidays']
);
