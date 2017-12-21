import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {PostBoxComponent} from './post-box.component';
import moment = require('moment');

describe('MessageBoxComponent', () => {
  let component: PostBoxComponent;
  let fixture: ComponentFixture<PostBoxComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, MatFormFieldModule, FormsModule, MatInputModule, NoopAnimationsModule],
      declarations: [PostBoxComponent]
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
      return createPost(someMessage);
    });

    it('post should appear in the list', () => {
      const post = debugElement.queryAll(By.css('.mat-list-item-content'))
        .map(it => it.nativeElement.textContent)
        .find(it => it.includes(someMessage));

      expect(post).toContain(someMessage);
    });

    it('post should have a timestamp', () => {
      const post = debugElement.queryAll(By.css('.mat-list-item-content'))
        .map(it => it.nativeElement.textContent)
        .find(it => it.includes(someMessage));

      expect(post).toContain(moment().format('Do MMMM'));
    });

    it('should clear the input field after the message is sent', () => {
      expect(component.postInput).toBe('');
    });
  });

  function createPost(someMessage: string) {
    const input = debugElement.query(By.css('input'));
    input.nativeElement.value = someMessage;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {
      'key': 'Enter'
    }));
    fixture.detectChanges();
  }
});
