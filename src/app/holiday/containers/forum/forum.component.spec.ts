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
import {of} from 'rxjs';
import {ForumComponent} from './forum.component';
import moment = require('moment');

class PostBoxPO {
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
  let postBoxPO: PostBoxPO;
  let store: Store<HolidaysState>;

  const inputHoliday = {
    id: 'someId',
    name: 'someName',
    created: ''
  };

  const somePost: PostDTO = {
    id: 'someId',
    text: 'first message',
    holidayId: 'holidayId',
    authorId: 'someAuthor',
    created: moment('2016-01-01').toISOString()
  };

  const moreRecentPost: PostDTO = {
    id: 'anotherId',
    text: 'second message',
    holidayId: 'holidayId',
    authorId: 'someAuthor',
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
      declarations: [ForumComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    authServiceMock = TestBed.get(AuthService);
    store = TestBed.get(Store);

    authServiceMock.activeUser.mockReturnValue(of(someAuthor));

    fixture = TestBed.createComponent(ForumComponent);
    postBoxPO = new PostBoxPO(fixture, inputHoliday, someAuthor, [somePost, moreRecentPost]);

    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('displays posts', () => {
    let postedMessages: string[];

    beforeEach(async () => {
      await fixture.whenStable();
      fixture.detectChanges();

      postedMessages = debugElement.queryAll(By.css('app-post'))
        .map(it => it.properties.post.text);
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
});
