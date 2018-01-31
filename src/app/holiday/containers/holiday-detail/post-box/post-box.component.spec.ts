import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {PostBoxComponent} from './post-box.component';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import moment = require('moment');
import {AuthService, MtravelUser} from '../../../../auth/services/auth.service';
import {Post, PostFirestore} from '../../../services/post-firestore.service';
import {authServiceMocker, postFirestoreMock} from '../../../../test-support/stubs';
import {Holiday} from '../../../model/holiday';

class PostBoxPO {
  constructor(private fixture: ComponentFixture<PostBoxComponent>, holiday: Holiday) {
    const component = fixture.componentInstance;
    component.holiday = holiday;
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
    email: 'someMail'
  };

  let fixture: ComponentFixture<PostBoxComponent>;
  let debugElement: DebugElement;
  let postFS: jasmine.SpyObj<PostFirestore>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let postBoxPO: PostBoxPO;
  const holidayPostsSubject: Subject<Post[]> = new Subject<Post[]>();
  const inputHoliday = {id: 'someId', name: 'someName'};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: PostFirestore, useValue: postFirestoreMock},
        {provide: AuthService, useFactory: authServiceMocker}
      ],
      imports: [FormsModule, NoopAnimationsModule],
      declarations: [PostBoxComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    postFS = TestBed.get(PostFirestore);
    authServiceMock = TestBed.get(AuthService);
    postFS.observeByHolidayId.and.returnValue(holidayPostsSubject);
    authServiceMock.activeUser.and.returnValue(Observable.of(someAuthor));

    fixture = TestBed.createComponent(PostBoxComponent);
    postBoxPO = new PostBoxPO(fixture, inputHoliday);

    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('displays posts', () => {
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

    let postedMessages: string[];

    beforeEach(async () => {
      holidayPostsSubject.next([somePost, moreRecentPost]);
      await fixture.whenStable();
      fixture.detectChanges();

      postedMessages = debugElement.queryAll(By.css('app-post'))
        .map(it => it.properties.post.text);
    });

    it('posts should appear in the list', () => {
      expect(postedMessages).toContain(somePost.text);
      expect(postedMessages).toContain(moreRecentPost.text);
    });

    it('should show most recent posts first', () => {
      expect(postedMessages.indexOf(moreRecentPost.text)).toBeLessThan(postedMessages.indexOf(somePost.text));
    });
  });

  describe('creating a new post', () => {
    let post: Post;
    const someMessage = 'someMessage';

    beforeEach(async () => {
      postBoxPO.createPost(someMessage);
      await fixture.whenStable();
      fixture.detectChanges();

      post = postFS.save.calls.argsFor(0)[0];
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
