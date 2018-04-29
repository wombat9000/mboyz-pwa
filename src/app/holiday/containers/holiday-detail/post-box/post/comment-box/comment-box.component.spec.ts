import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommentBoxComponent} from './comment-box.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';
import {AuthService, MtravelUser} from '../../../../../../auth/services/auth.service';
import {authServiceMocker} from '../../../../../../test-support/stubs';
import {CommentFieldComponent} from '../../../../../components/comment-field/comment-field.component';
import {Post} from '../../../../../models/post';
import {MbComment} from '../../../../../models/comment';
import * as fromHoliday from '../../../../../reducers';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import moment = require('moment');
import {HolidaysState} from '../../../../../reducers';
import * as comment from '../../../../../actions/comment.actions';
import * as post from '../../../../../actions/post.actions';

describe('CommentBoxComponent', () => {
  let component: CommentBoxComponent;
  let fixture: ComponentFixture<CommentBoxComponent>;
  let debugElement: DebugElement;
  let authService: jasmine.SpyObj<AuthService>;
  let store: Store<HolidaysState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, MatFormFieldModule, FormsModule, MatInputModule, NoopAnimationsModule,
        StoreModule.forRoot({
          holidayPlanner: combineReducers(fromHoliday.reducers),
        })
      ],
      providers: [
        {provide: AuthService, useFactory: authServiceMocker}
      ],
      declarations: [CommentBoxComponent, CommentFieldComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  const someAuthor: MtravelUser = {
    displayName: 'Pinky Floyd',
    uid: 'someUid',
    email: 'someMail',
    photoURL: null
  };

  const parentPost: Post = {
    id: 'somePostId',
    text: '',
    holidayId: 'someHolidayId',
    authorId: '',
    created: moment('2016-01-01').toISOString()
  };

  beforeEach(() => {
    store = TestBed.get(Store);
    store.dispatch(new post.Create({post: parentPost}));

    authService = TestBed.get(AuthService);
    authService.activeUser.and.returnValue(Observable.of(someAuthor));

    fixture = TestBed.createComponent(CommentBoxComponent);
    component = fixture.componentInstance;
    component.post = parentPost;
    debugElement = fixture.debugElement;
  });

  describe('display comments', () => {
    const someComment: MbComment = {
      id: 'someId',
      text: '',
      postId: parentPost.id,
      holidayId: '',
      authorId: '',
      created: moment('2016-01-02').toISOString()
    };

    const moreRecentComment: MbComment = {
      id: 'anotherId',
      text: '',
      postId: parentPost.id,
      holidayId: '',
      authorId: '',
      created: moment('2016-01-03').toISOString()
    };

    beforeEach(() => {
      store.dispatch(new comment.Create({comment: moreRecentComment}));
      store.dispatch(new comment.Create({comment: someComment}));

      fixture.detectChanges();
    });

    it('fetches comments for post', (done) => {
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
    let savedComment: MbComment;

    beforeEach(async () => {
      const spy = spyOn(store, 'dispatch');
      fixture.detectChanges();
      createComment('new comment');

      savedComment = spy.calls.first().args[0].payload.comment;
    });

    it('should persist the new message', () => {
      expect(savedComment.text).toBe('new comment');
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
