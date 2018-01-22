import {HolidayService} from '../holiday/holiday.service';
import {UserFirestore} from '../auth/services/user-firestore.service';
import {HolidayFirestore} from '../holiday/holiday-firestore.service';
import {AuthService} from '../auth/services/auth.service';
import {Router} from '@angular/router';
import {PostFirestore} from '../holiday/post-firestore.service';
import {CommentFirestore} from '../holiday/holiday-detail/post-box/post/comment-box/comment-firestore.service';
import {Store} from '@ngrx/store';

export class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }

  navigate(args: string[]) {
    return args;
  }
}

export function holidayServiceMocker(): () => jasmine.SpyObj<HolidayService> {
  return  jasmine.createSpyObj('HolidayService',
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
}


export const storeMocker: <T>() => jasmine.SpyObj<Store<T>> = () => jasmine.createSpyObj('Store', ['dispatch']);
export const routerMocker: () => jasmine.SpyObj<Router> = () => jasmine.createSpyObj('Router', ['navigate']);
export const authServiceMocker: () => jasmine.SpyObj<AuthService> = () => jasmine.createSpyObj('AuthService', [
  'isSignedIn',
  'activeUser',
  'facebookLogin',
  'updateUserData'
]);
export const userFirestoreMock: jasmine.SpyObj<UserFirestore> = jasmine.createSpyObj('UserFirestore', ['observeById', 'save']);
export const holidayFirestoreMock: jasmine.SpyObj<HolidayFirestore> = jasmine.createSpyObj('HolidayFirestore', ['observeById', 'save']);
export const postFirestoreMock: jasmine.SpyObj<PostFirestore> = jasmine.createSpyObj('PostFirestore', ['observeByHolidayId', 'save']);
export const commentFirestoreMock: jasmine.SpyObj<CommentFirestore> = jasmine.createSpyObj('CommentFirestore', ['observeByPost', 'save']);
