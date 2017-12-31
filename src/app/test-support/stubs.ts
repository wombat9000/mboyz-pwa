import {HolidayService} from '../holiday/holiday.service';
import {UserFirestore} from '../core/user-firestore.service';
import {HolidayFirestore} from '../holiday/holiday-firestore.service';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';
import {PostFirestore} from '../holiday/post-firestore.service';

export class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }

  navigate(args: string[]) {
    return args;
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

export const routerMock: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
export const authServiceMock: jasmine.SpyObj<AuthService> = jasmine.createSpyObj('AuthService', ['isSignedIn', 'activeUser']);
export const userFirestoreMock: jasmine.SpyObj<UserFirestore> = jasmine.createSpyObj('UserFirestore', ['observeById', 'save']);
export const holidayFirestoreMock: jasmine.SpyObj<HolidayFirestore> = jasmine.createSpyObj('HolidayFirestore', ['observeById', 'save']);
export const postFirestoreMock: jasmine.SpyObj<PostFirestore> = jasmine.createSpyObj('PostFirestore', ['observeByHolidayId', 'save']);
