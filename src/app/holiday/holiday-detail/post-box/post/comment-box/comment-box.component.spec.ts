import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentBoxComponent} from './comment-box.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {CommentFirestore} from './comment-firestore.service';
import {commentFirestoreMock} from '../../../../../test-support/stubs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {Comment, Post} from '../../../../post-firestore.service';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';
import moment = require('moment');

fdescribe('CommentBoxComponent', () => {
  let component: CommentBoxComponent;
  let fixture: ComponentFixture<CommentBoxComponent>;
  let debugElement: DebugElement;
  let commentFirestore: jasmine.SpyObj<CommentFirestore>;

  const parentPost: Post = new Post('', '', '', '', moment());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, MatFormFieldModule, FormsModule, MatInputModule, NoopAnimationsModule],
      providers: [
        {provide: CommentFirestore, useValue: commentFirestoreMock}
      ],
      declarations: [CommentBoxComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    commentFirestore = TestBed.get(CommentFirestore);
    fixture = TestBed.createComponent(CommentBoxComponent);
    component = fixture.componentInstance;
    component.post = parentPost;
    debugElement = fixture.debugElement;
  });

  describe('display comments', () => {

    const someComment = new Comment('someId', parentPost.id, '', '', moment('2016-01-01'));
    const moreRecentComment = new Comment('anotherId', parentPost.id, '', '', moment('2016-01-02'));

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

    it('should show older comments first', async () => {
      await fixture.whenStable();

      const comments = debugElement.queryAll(By.css('app-comment'))
        .map(it => it.properties.comment);
      expect(comments).toContain(someComment);
      expect(comments).toContain(moreRecentComment);

      expect(comments.indexOf(someComment)).toBeLessThan(comments.indexOf(moreRecentComment));
    });
  });
});
