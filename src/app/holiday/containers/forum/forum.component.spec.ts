import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService, MtravelUser} from '../../../auth/services/auth.service';
import {authServiceMocker} from '../../../test-support/stubs';
import {HolidayDTO} from '../../models/holiday';
import {PostDTO} from '../../models/post';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromHoliday from '../../reducers/index';
import {HolidaysState} from '../../reducers';
import {ForumComponent} from './forum.component';
import {CommentDTO} from '../../models/comment';
import {PostComponent} from '../../components/post/post.component';
import moment = require('moment');
import * as userActions from '../../actions/user.actions';
import * as commentActions from '../../actions/comment.actions';

class ForumPO {
  constructor(private fixture: ComponentFixture<ForumComponent>,
              holiday: HolidayDTO,
              activeUser: MtravelUser,
              posts: PostDTO[]) {
    const component = fixture.componentInstance;
    component.holiday = holiday;
    component.activeUser = activeUser;
    component.posts = posts;
  }

  postInput() {
    return this.fixture.debugElement.query(By.css('textarea'));
  }

  createPost(text: string) {
    const input = this.postInput();
    input.nativeElement.value = text;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {
      'key': 'Enter'
    }));
    this.fixture.detectChanges();
  }
}

describe('ForumComponent', () => {

  const someAuthor: MtravelUser = {
    displayName: 'Pinky Floyd',
    id: 'someUid',
    email: 'someMail',
    photoURL: null
  };

  let fixture: ComponentFixture<ForumComponent>;
  let debugElement: DebugElement;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let postBoxPO: ForumPO;
  let store: Store<HolidaysState>;

  const inputHoliday = {
    id: 'holidayId',
    name: 'someName',
    created: ''
  };

  const somePost: PostDTO = {
    id: 'someId',
    text: 'first message',
    holidayId: 'holidayId',
    authorId: 'someUid',
    created: moment('2016-01-01').toISOString()
  };

  const moreRecentPost: PostDTO = {
    id: 'anotherId',
    text: 'second message',
    holidayId: 'holidayId',
    authorId: 'someUid',
    created: moment('2016-01-02').toISOString()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, NoopAnimationsModule,
        StoreModule.forRoot({
          holidayPlanner: combineReducers(fromHoliday.reducers),
        })
      ],
      providers: [
        {provide: AuthService, useFactory: authServiceMocker}
      ],
      declarations: [ForumComponent, PostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    authServiceMock = TestBed.get(AuthService);
    store = TestBed.get(Store);

    store.dispatch(new userActions.Create({record: someAuthor}));

    fixture = TestBed.createComponent(ForumComponent);
    postBoxPO = new ForumPO(fixture, inputHoliday, someAuthor, [somePost, moreRecentPost]);

    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('displays posts', () => {
    let postedMessages: string[];

    beforeEach(async () => {
      await fixture.whenStable();
      fixture.detectChanges();

      postedMessages = debugElement.queryAll(By.css('app-post'))
        .map(it => it.componentInstance.post.text);
    });

    it('posts should appear in the list', () => {
      expect(postedMessages).toContain(somePost.text);
      expect(postedMessages).toContain(moreRecentPost.text);
    });
  });

  describe('creating a new post', () => {
    let post: PostDTO;
    const someMessage = 'someMessage';

    beforeEach(async () => {
      const dispatchSpy = spyOn(store, 'dispatch');

      postBoxPO.createPost(someMessage);
      await fixture.whenStable();
      fixture.detectChanges();

      post = dispatchSpy.calls.argsFor(0)[0].payload.record;
    });

    it('should clear the input field after the message is sent', () => {
      expect(fixture).toMatchSnapshot();
    });

    it('should persist the new message', () => {
      expect(post.text).toBe(someMessage);
    });

    it('should use currently logged in users name as someAuthor', () => {
      expect(post.authorId).toBe(someAuthor.id);
    });
  });

  describe('creating a new comment', () => {
    let comment: CommentDTO;
    const someMessage = 'someMessage';

    it('should match snapshot', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      const postComponent = fixture.debugElement.query(By.css('app-post'));
      postComponent.componentInstance.newComment.emit(someMessage);
      fixture.detectChanges();
      const action = dispatchSpy.calls.argsFor(0)[0];
      comment = action.payload.record;
      expect(action.type).toBe(commentActions.CREATE);
      expect(comment.holidayId).toBe(inputHoliday.id);
    });
  });
});
