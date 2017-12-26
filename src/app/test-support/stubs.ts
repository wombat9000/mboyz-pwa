import {HolidayService} from '../holiday/holiday.service';
import {UserFirestore} from '../core/user-firestore.service';
import {HolidayFirestore} from '../holiday/holiday-firestore.service';

export class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

export const holidayServiceMock: jasmine.SpyObj<HolidayService> =
  jasmine.createSpyObj('HolidayService',
    {
      holidayFS: null,
      create() {
      },
      getHolidays() {
      },
      findById() {
      },
    }
  );


export const userFirestoreMock: jasmine.SpyObj<UserFirestore> = jasmine.createSpyObj('UserFirestore', ['observeById', 'save']);
export const holidayFirestoreMock: jasmine.SpyObj<HolidayFirestore> = jasmine.createSpyObj('HolidayFirestore', ['observeById', 'save']);
