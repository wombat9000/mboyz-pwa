import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {PostBoxComponent} from './post-box.component';
import {Subject} from 'rxjs/Subject';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService, MtravelUser} from '../../../auth/services/auth.service';
import {authServiceMocker} from '../../../test-support/stubs';
import {Holiday} from '../../models/holiday';
import {Post} from '../../models/post';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromHoliday from '../../reducers/index';
import {HolidaysState} from '../../reducers';
import moment = require('moment');
import {of} from 'rxjs';

class PostBoxPO {
  constructor(private fixture: ComponentFixture<PostBoxComponent>,
              holiday: Holiday,
              activeUser: MtravelUser,
              posts: Post[]) {
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

describe('PostBoxComponent', () => {

  const someAuthor: MtravelUser = {
    displayName: 'Pinky Floyd',
    uid: 'someUid',
    email: 'someMail',
    photoURL: null
  };

  let fixture: ComponentFixture<PostBoxComponent>;
  let debugElement: DebugElement;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let postBoxPO: PostBoxPO;
  let store: Store<HolidaysState>;

  const holidayPostsSubject: Subject<Post[]> = new Subject<Post[]>();
  const inputHoliday = {
    id: 'someId',
    name: 'someName',
    created: ''
  };

  const somePost: Post = {
    id: 'someId',
    text: 'first message',
    holidayId: 'holidayId',
    authorId: 'someAuthor',
    created: moment('2016-01-01').toISOString()
  };

  const moreRecentPost: Post = {
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
      declarations: [PostBoxComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    authServiceMock = TestBed.get(AuthService);
    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValue(holidayPostsSubject);

    authServiceMock.activeUser.and.returnValue(of(someAuthor));

    fixture = TestBed.createComponent(PostBoxComponent);
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
    let post: Post;
    const someMessage = 'someMessage';

    beforeEach(async () => {
      const dispatchSpy = spyOn(store, 'dispatch');

      postBoxPO.createPost(someMessage);
      await fixture.whenStable();
      fixture.detectChanges();

      post = dispatchSpy.calls.argsFor(0)[0].payload.record;
    });

    it('should persist the new message', () => {
      expect(post.text).toBe(someMessage);
    });

    it('should clear the input field after the message is sent', () => {
      expect(postBoxPO.postInput().nativeElement.value).toBe('');
    });

    it('should use currently logged in users name as someAuthor', () => {
      expect(post.authorId).toBe(someAuthor.uid);
    });
  });
});
