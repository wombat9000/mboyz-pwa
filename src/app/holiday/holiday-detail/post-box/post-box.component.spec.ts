import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {PostBoxComponent} from './post-box.component';
import {CommentBoxComponent} from './comment-box/comment-box.component';
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
      declarations: [PostBoxComponent, CommentBoxComponent]
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
    const somePost = new Post('someAuthor', 'first message', moment('2016-01-01'), []);
    const moreRecentPost = new Post('someAuthor', 'second message', moment('2016-01-02'), []);

    beforeEach(async () => {

      holidayPostsSubject.next([somePost, moreRecentPost]);
      await fixture.whenStable();
      fixture.detectChanges();
    });

    it('posts should appear in the list', () => {
      const posts = debugElement.queryAll(By.css('.message'))
        .map(it => it.nativeElement.textContent);

      expect(posts).toContain(somePost.message);
      expect(posts).toContain(moreRecentPost.message);
    });

    it('post should have a timestamp', () => {
      const post = debugElement.queryAll(By.css('.post'))
        .find(it => it.nativeElement.textContent.includes(somePost.message));
      const renderedDate = post.query(By.css('.created-text')).nativeElement.textContent;

      expect(renderedDate).toContain(somePost.created.format('Do MMMM'));
    });

    it('should show most recent posts first', () => {
      const posts = debugElement.queryAll(By.css('.message'))
        .map(it => it.nativeElement.textContent);

      expect(posts.indexOf(moreRecentPost.message)).toBeLessThan(posts.indexOf(somePost.message));
    });
  });

  describe('creating a new post', () => {
    const someMessage = 'someMessage';

    const someAuthor = {
      displayName: 'Pinky Floyd',
      uid: 'bla',
      email: ''
    };

    let saveCallArgs: any[];
    let post: Post;

    beforeEach(async () => {
      userEmitter.next(someAuthor);

      createPost(someMessage);
      await fixture.whenStable();
      fixture.detectChanges();

      saveCallArgs = postFS.save.calls.argsFor(0);
      post = saveCallArgs[1];
    });

    it('should persist the new message', () => {
      expect(saveCallArgs[0]).toBe(inputHoliday.id);
      expect(post.message).toBe(someMessage);
    });

    it('should clear the input field after the message is sent', () => {
      expect(component.postInput).toBe('');
    });

    it('should use currently logged in users name as someAuthor', () => {
      expect(saveCallArgs[0]).toBe(inputHoliday.id);
      expect(post.author).toBe(someAuthor.displayName);
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
