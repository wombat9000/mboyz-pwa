import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentBoxComponent} from './comment-box.component';
import {MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {Comment, Post} from '../../../../post-firestore.service';
import moment = require('moment');

xdescribe('CommentBoxComponent', () => {
  let component: CommentBoxComponent;
  let fixture: ComponentFixture<CommentBoxComponent>;
  let debugElement: DebugElement;

  const someComment = new Comment('author1', 'someComment', moment('2016-01-01'));
  const anotherComment = new Comment('author2', 'anotherComment', moment('2016-01-02'));
  const parentPost = new Post('', '', '', '', moment('2016-01-01'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, MatFormFieldModule, FormsModule, MatInputModule, NoopAnimationsModule],
      declarations: [CommentBoxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentBoxComponent);
    component = fixture.componentInstance;
    component.post = parentPost;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('displaying existing comments', () => {

    it('comments should appear in the list', () => {
      const comments = debugElement.queryAll(By.css('.comment-body .message'))
        .map(it => it.nativeElement.textContent);

      expect(comments).toContain(someComment.comment);
      expect(comments).toContain(anotherComment.comment);
    });

    it('comments should have a timestamp', () => {
      const post = debugElement.queryAll(By.css('.comment'))
        .find(it => it.nativeElement.textContent.includes(someComment.comment));
      const renderedDate = post.query(By.css('.created-text')).nativeElement.textContent;

      expect(renderedDate).toContain(someComment.created.format('Do MMMM'));
    });
  });

  function createComment(someMessage: string) {
    const input = debugElement.query(By.css('textarea'));
    input.nativeElement.value = someMessage;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {
      'key': 'Enter'
    }));
    fixture.detectChanges();
  }
});
