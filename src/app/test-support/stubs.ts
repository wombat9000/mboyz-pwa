import {HolidayService} from '../holiday/holiday.service';
import {UserFirestore} from '../core/user-firestore.service';

export class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

export const holidayServiceMock: jasmine.SpyObj<HolidayService> = jasmine.createSpyObj('HolidayService',
  ['create', 'getHolidays']
);


export const userFirestoreMock: jasmine.SpyObj<UserFirestore> = jasmine.createSpyObj('UserRepository', ['observeById', 'save']);
