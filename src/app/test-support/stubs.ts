import {HolidayService} from '../holiday.service';
import {UserRepository} from '../user-repository.service';

export class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

export const holidayServiceMock: jasmine.SpyObj<HolidayService> = jasmine.createSpyObj('HolidayService',
  ['create', 'getHolidays']
);


export const userRepositoryMock: jasmine.SpyObj<UserRepository> = jasmine.createSpyObj('UserRepository', ['observeById', 'save']);
