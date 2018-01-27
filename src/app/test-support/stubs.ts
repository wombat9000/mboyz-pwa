import {UserFirestore} from '../auth/services/user-firestore.service';
import {HolidayFirestore} from '../holiday/holiday-firestore.service';
import {AuthService} from '../auth/services/auth.service';
import {Router} from '@angular/router';
import {PostFirestore} from '../holiday/post-firestore.service';
import {CommentFirestore} from '../holiday/holiday-detail/post-box/post/comment-box/comment-firestore.service';
import {Store} from '@ngrx/store';
import {FirebaseApp} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {HolidayService} from '../holiday/holiday.service';


export class FireAuthStub implements AngularFireAuth {
  app: FirebaseApp = jasmine.createSpyObj('FireBaseApp', ['']);
  auth: jasmine.SpyObj<firebase.auth.Auth> = jasmine.createSpyObj('Auth', ['signOut']);
  authState: Observable<firebase.User | null>;
  idToken: Observable<string | null>;
}

export const holidayServiceMocker: () => jasmine.SpyObj<HolidayService> =
  () => jasmine.createSpyObj('HolidayService', ['create', 'findById']);
export const storeMocker: <T>() => jasmine.SpyObj<Store<T>> =
  () => jasmine.createSpyObj('Store', ['dispatch', 'select']);
export const routerMocker: () => jasmine.SpyObj<Router> =
  () => jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
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
