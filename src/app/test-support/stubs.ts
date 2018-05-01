import {UserService} from '../auth/services/user.service';
import {HolidayFirestore} from '../holiday/services/holiday-firestore.service';
import {AuthService} from '../auth/services/auth.service';
import {Router} from '@angular/router';
import {PostFirestore} from '../holiday/services/post-firestore.service';
import {CommentFirestore} from '../holiday/services/comment-firestore.service';
import {Store} from '@ngrx/store';
import {FirebaseApp} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseAuth} from '@firebase/auth-types';
import {Actions} from '@ngrx/effects';
import {empty} from 'rxjs/observable/empty';


export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

export class FireAuthStub implements AngularFireAuth {
  app: FirebaseApp = jasmine.createSpyObj('FireBaseApp', ['']);
  auth: jasmine.SpyObj<FirebaseAuth> = jasmine.createSpyObj('FirebaseAuth', ['signOut', 'signInWithPopup']);
  authState: Observable<any | null>;
  idToken: Observable<string | null>;
}

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
export const userFirestoreMocker: () => jasmine.SpyObj<UserService> =
  () => jasmine.createSpyObj('UserFirestore', ['observeById', 'save']);

export const postFirestoreMocker: () => jasmine.SpyObj<PostFirestore> =
  () => jasmine.createSpyObj('PostFirestore', ['observeByHolidayId', 'save', 'observeChanges']);

export const holidayFirestoreMocker: () => jasmine.SpyObj<HolidayFirestore> =
  () => jasmine.createSpyObj('HolidayFirestore', ['observeById', 'save', 'observeChanges']);

export const commentFirestoreMocker: () => jasmine.SpyObj<CommentFirestore> =
  () => jasmine.createSpyObj('CommentFirestore', ['save', 'observeChangesFrom']);
