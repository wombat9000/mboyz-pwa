import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {PostBoxComponent} from './post-box.component';
import {Post, PostFirestore} from '../../post-firestore.service';
import {authServiceMock, postFirestoreMock} from '../../../test-support/stubs';
import {Holiday} from '../../holiday.service';
import {Subject} from 'rxjs/Subject';
import {AuthService, User} from '../../../core/auth.service';
import {Observable} from 'rxjs/Observable';
import moment = require('moment');

class PostBoxPO {
  constructor(private fixture: ComponentFixture<PostBoxComponent>, holiday: Holiday) {
    const component = fixture.componentInstance;
    component.holiday = holiday;
  }

  postInput() {
    return this.fixture.debugElement.query(By.css('textarea'));
  }

  createPost(text: string) {
    const input = this.fixture.debugElement.query(By.css('textarea'));
    input.nativeElement.value = text;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {
      'key': 'Enter'
    }));
    this.fixture.detectChanges();
  }
}

describe('PostBoxComponent', () => {

  const someAuthor: User = {
    displayName: 'Pinky Floyd',
    uid: 'someUid',
    email: 'someMail'
  };

  let fixture: ComponentFixture<PostBoxComponent>;
  let debugElement: DebugElement;
  let postFS: jasmine.SpyObj<PostFirestore>;
  let postBoxPO: PostBoxPO;
  const holidayPostsSubject: Subject<Post[]> = new Subject<Post[]>();
  const inputHoliday = new Holiday('someId', 'someName');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: PostFirestore, useValue: postFirestoreMock},
        {provide: AuthService, useValue: authServiceMock}
      ],
      imports: [FormsModule],
      declarations: [PostBoxComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    postFS = TestBed.get(PostFirestore);
    postFS.observeByHolidayId.and.returnValue(holidayPostsSubject);
    authServiceMock.activeUser.and.returnValue(Observable.of(someAuthor));

    fixture = TestBed.createComponent(PostBoxComponent);
    postBoxPO = new PostBoxPO(fixture, inputHoliday);

    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('displays posts', () => {
    const somePost = new Post('someId', 'someAuthor', 'holidayId', 'first message', moment('2016-01-01'));
    const moreRecentPost = new Post('anotherId', 'someAuthor', 'holidayId', 'second message', moment('2016-01-02'));

    let postedMessages: string[];

    beforeEach(async () => {
      holidayPostsSubject.next([somePost, moreRecentPost]);
      await fixture.whenStable();
      fixture.detectChanges();

      postedMessages = debugElement.queryAll(By.css('app-post'))
        .map(it => it.properties.post.message);
    });

    it('posts should appear in the list', () => {
      expect(postedMessages).toContain(somePost.message);
      expect(postedMessages).toContain(moreRecentPost.message);
    });

    it('should show most recent posts first', () => {
      expect(postedMessages.indexOf(moreRecentPost.message)).toBeLessThan(postedMessages.indexOf(somePost.message));
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
      expect(post.message).toBe(someMessage);
    });

    it('should clear the input field after the message is sent', () => {
      expect(postBoxPO.postInput().nativeElement.value).toBe('');
    });

    it('should use currently logged in users name as someAuthor', () => {
      expect(post.authorId).toBe(someAuthor.uid);
    });
  });
});
