import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {PostBoxComponent} from './post-box.component';
import {CommentBoxComponent} from './post/comment-box/comment-box.component';
import {Post, PostFirestore} from '../../post-firestore.service';
import {authServiceMock, postFirestoreMock} from '../../../test-support/stubs';
import {Holiday} from '../../holiday.service';
import {Subject} from 'rxjs/Subject';
import {AuthService, User} from '../../../core/auth.service';
import moment = require('moment');


describe('PostBoxComponent', () => {
  let component: PostBoxComponent;
  let fixture: ComponentFixture<PostBoxComponent>;
  let debugElement: DebugElement;
  let postFS: jasmine.SpyObj<PostFirestore>;
  const holidayPostsSubject: Subject<Post[]> = new Subject<Post[]>();
  const userEmitter = new Subject<User>();
  const inputHoliday = new Holiday('someId', 'someName');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PostFirestore,
          useValue: postFirestoreMock
        },
        {
          provide: AuthService,
          useValue: authServiceMock
        }
      ],
      imports: [MatListModule, MatFormFieldModule, FormsModule, MatInputModule, NoopAnimationsModule],
      declarations: [PostBoxComponent, CommentBoxComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    postFS = TestBed.get(PostFirestore);
    postFS.observeByHolidayId.and.returnValue(holidayPostsSubject);

    authServiceMock.activeUser.and.returnValue(userEmitter);

    fixture = TestBed.createComponent(PostBoxComponent);
    component = fixture.componentInstance;
    component.holiday = inputHoliday;
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
    const someMessage = 'someMessage';

    const someAuthor = {
      displayName: 'Pinky Floyd',
      uid: 'someUid',
      email: 'someMail'
    };

    let post: Post;

    beforeEach(async () => {
      userEmitter.next(someAuthor);

      createPost(someMessage);
      await fixture.whenStable();
      fixture.detectChanges();

      post = postFS.save.calls.argsFor(0)[0];
    });

    it('should persist the new message', () => {
      expect(post.message).toBe(someMessage);
    });

    it('should clear the input field after the message is sent', () => {
      expect(component.postInput).toBe('');
    });

    it('should use currently logged in users name as someAuthor', () => {
      expect(post.authorId).toBe(someAuthor.uid);
    });
  });

  function createPost(someMessage: string) {
    const input = debugElement.query(By.css('textarea'));
    input.nativeElement.value = someMessage;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {
      'key': 'Enter'
    }));
    fixture.detectChanges();
  }
});
