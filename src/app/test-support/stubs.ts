import {HolidayService} from '../holiday/holiday.service';
import {UserFirestore} from '../core/user-firestore.service';
import {HolidayFirestore} from '../holiday/holiday-firestore.service';

export class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

export const holidayServiceMock: jasmine.SpyObj<HolidayService> = jasmine.createSpyObj('HolidayService',
  ['create', 'getHolidays']
);


export const userFirestoreMock: jasmine.SpyObj<UserFirestore> = jasmine.createSpyObj('UserFirestore', ['observeById', 'save']);
export const holidayFirestoreMock: jasmine.SpyObj<HolidayFirestore> = jasmine.createSpyObj('HolidayFirestore', ['observeById', 'save']);
