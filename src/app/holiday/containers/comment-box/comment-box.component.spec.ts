import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommentBoxComponent} from './comment-box.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {By} from '@angular/platform-browser';
import {MtravelUser} from '../../../auth/services/auth.service';
import {CommentFieldComponent} from '../../components/comment-field/comment-field.component';
import {PostDTO} from '../../models/post';
import {CommentDTO} from '../../models/comment';
import * as fromHoliday from '../../reducers/index';
import {HolidaysState} from '../../reducers';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import moment = require('moment');

describe('CommentBoxComponent', () => {
  let component: CommentBoxComponent;
  let fixture: ComponentFixture<CommentBoxComponent>;
  let debugElement: DebugElement;
  let store: Store<HolidaysState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, MatFormFieldModule, FormsModule, MatInputModule, NoopAnimationsModule,
        StoreModule.forRoot({
          holidayPlanner: combineReducers(fromHoliday.reducers),
        })
      ],
      declarations: [CommentBoxComponent, CommentFieldComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  const someAuthor: MtravelUser = {
    displayName: 'Pinky Floyd',
    id: 'someUid',
    email: 'someMail',
    photoURL: null
  };

  const parentPost: PostDTO = {
    id: 'somePostId',
    text: '',
    holidayId: 'someHolidayId',
    authorId: '',
    created: moment('2016-01-01').toISOString()
  };

  const someComment: CommentDTO = {
    id: 'someId',
    text: '',
    postId: parentPost.id,
    holidayId: '',
    authorId: '',
    created: moment('2016-01-02').toISOString()
  };

  const moreRecentComment: CommentDTO = {
    id: 'anotherId',
    text: '',
    postId: parentPost.id,
    holidayId: '',
    authorId: '',
    created: moment('2016-01-03').toISOString()
  };

  beforeEach(() => {
    store = TestBed.get(Store);

    fixture = TestBed.createComponent(CommentBoxComponent);
    component = fixture.componentInstance;
    component.post = parentPost;
    component.activeUser = someAuthor;
    component.comments = [someComment, moreRecentComment];
    debugElement = fixture.debugElement;
  });

  describe('creating a comment', () => {
    let savedComment: CommentDTO;

    beforeEach(async () => {
      const spy = spyOn(store, 'dispatch');
      fixture.detectChanges();
      createComment('new comment');

      savedComment = spy.calls.first().args[0].payload.record;
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
      expect(savedComment.authorId).toBe(someAuthor.id);
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
