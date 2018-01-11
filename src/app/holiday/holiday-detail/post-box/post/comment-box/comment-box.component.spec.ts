import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentBoxComponent} from './comment-box.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {Comment, CommentFirestore} from './comment-firestore.service';
import {authServiceMock, commentFirestoreMock} from '../../../../../test-support/stubs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {Post} from '../../../../post-firestore.service';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';
import {AuthService, User} from '../../../../../core/auth.service';
import moment = require('moment');

describe('CommentBoxComponent', () => {
  let component: CommentBoxComponent;
  let fixture: ComponentFixture<CommentBoxComponent>;
  let debugElement: DebugElement;
  let commentFirestore: jasmine.SpyObj<CommentFirestore>;
  let authService: jasmine.SpyObj<AuthService>;

  const parentPost: Post = {
    id: 'somePostId',
    text: '',
    holidayId: 'someHolidayId',
    authorId: '',
    created: moment('2016-01-01').toISOString()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, MatFormFieldModule, FormsModule, MatInputModule, NoopAnimationsModule],
      providers: [
        {provide: CommentFirestore, useValue: commentFirestoreMock},
        {provide: AuthService, useValue: authServiceMock}
      ],
      declarations: [CommentBoxComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    commentFirestore = TestBed.get(CommentFirestore);
    commentFirestore.observeByPost.and.returnValue(Observable.of([]));

    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(CommentBoxComponent);
    component = fixture.componentInstance;
    component.post = parentPost;
    debugElement = fixture.debugElement;
  });

  describe('display comments', () => {
    const someComment: Comment = {
      id: 'someId',
      text: '',
      postId: parentPost.id,
      holidayId: '',
      authorId: '',
      created: moment('2016-01-02').toISOString()
    };

    const moreRecentComment: Comment = {
      id: 'anotherId',
      text: '',
      postId: parentPost.id,
      holidayId: '',
      authorId: '',
      created: moment('2016-01-03').toISOString()
    };

    beforeEach(() => {
      commentFirestore.observeByPost.and.returnValue(Observable.of([moreRecentComment, someComment]));
      fixture.detectChanges();
    });

    it('fetches comments for post', (done) => {
      expect(commentFirestore.observeByPost).toHaveBeenCalledWith(parentPost);

      component.comments$.subscribe(comments => {
        expect(comments).toEqual([someComment, moreRecentComment]);
        done();
      });
    });

    it('should show older comments first', () => {
      const comments = debugElement.queryAll(By.css('app-comment'))
        .map(it => it.properties.comment);
      expect(comments).toContain(someComment);
      expect(comments).toContain(moreRecentComment);

      expect(comments.indexOf(someComment)).toBeLessThan(comments.indexOf(moreRecentComment));
    });
  });

  describe('creating a comment', () => {
    const someAuthor: User = {
      displayName: 'Pinky Floyd',
      uid: 'someUid',
      email: 'someMail'
    };

    let savedComment;

    beforeEach(async () => {
      authService.activeUser.and.returnValue(Observable.of(someAuthor));
      fixture.detectChanges();
      createComment('new comment');
      savedComment = commentFirestore.save.calls.first().args[0];
    });

    it('should persist the new message', () => {
      expect(savedComment.text).toBe('new comment');
    });

    it('should clear the input field after the message is sent', () => {
      expect(component.commentInput).toBe('');
    });

    it('should provide parent postId', () => {
      expect(savedComment.postId).toBe(parentPost.id);
    });

    it('should provide parent holidayId', () => {
      expect(savedComment.holidayId).toBe(parentPost.holidayId);
    });

    it('should use currently logged in users name as someAuthor', () => {
      expect(savedComment.authorId).toBe(someAuthor.uid);
    });
  });

  function createComment(inputText: string) {
    const input = debugElement.query(By.css('textarea'));
    input.nativeElement.value = inputText;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {
      'key': 'Enter'
    }));
    fixture.detectChanges();
  }
});
