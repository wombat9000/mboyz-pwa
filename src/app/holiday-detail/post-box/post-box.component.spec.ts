import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {PostBoxComponent} from './post-box.component';
import {CommentBoxComponent} from './comment-box/comment-box.component';
import moment = require('moment');

describe('PostBoxComponent', () => {
  let component: PostBoxComponent;
  let fixture: ComponentFixture<PostBoxComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, MatFormFieldModule, FormsModule, MatInputModule, NoopAnimationsModule],
      declarations: [PostBoxComponent, CommentBoxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBoxComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('creating a new post', () => {
    const someMessage = 'someMessage';

    beforeEach(() => {
      component.posts = [];
      createPost(someMessage);
    });

    it('post should appear in the list', () => {
      const post = debugElement.queryAll(By.css('.message'))
        .map(it => it.nativeElement.textContent)
        .find(it => it.includes(someMessage));

      expect(post).toContain(someMessage);
    });

    it('post should have a timestamp', () => {
      const post = debugElement.queryAll(By.css('.post'))
        .find(it => it.nativeElement.textContent.includes(someMessage));
      const renderedDate = post.query(By.css('.created-text')).nativeElement.textContent;

      expect(renderedDate).toContain(moment().format('Do MMMM'));
    });

    it('should clear the input field after the message is sent', () => {
      expect(component.postInput).toBe('');
    });

    it('should show newer posts first', () => {
      const newMessage = 'newer message';
      createPost(newMessage);
      const posts = component.posts.map(it => it.message);
      expect(posts.indexOf(newMessage)).toBeLessThan(posts.indexOf(someMessage));
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