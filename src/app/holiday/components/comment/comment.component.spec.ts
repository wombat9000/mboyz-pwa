import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentComponent} from './comment.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MtravelUser} from '../../../auth/services/auth.service';
import {CommentDTO} from '../../models/comment';
import moment = require('moment');

describe('CommentComponent', () => {
  let component: CommentComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<CommentComponent>;

  const someUser: MtravelUser = {
    id: 'someAuthorId',
    displayName: 'someDisplayName',
    photoURL: 'somePhotoUrl',
    email: 'someEmail'
  };

  const someComment: CommentDTO = {
    id: 'someId',
    postId: 'somePost',
    holidayId: 'someHolidayId',
    authorId: 'someAuthor',
    text: 'someMessage',
    created: moment().toISOString(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    component.comment = someComment;
    component.author = someUser;
    fixture.detectChanges();
  });

  it('should show the username for given id with space', async () => {
    await fixture.whenStable();
    const author = debugElement.query(By.css('.author')).nativeElement.textContent;

    expect(author).toBe(someUser.displayName + ' ');
  });

  it('should show the text of the comment', async () => {
    await fixture.whenStable();
    const message = debugElement.query(By.css('.message')).nativeElement.textContent;

    expect(message).toBe(someComment.text);
  });

  it('post should have a timestamp', async () => {
    await fixture.whenStable();
    const renderedDate = debugElement.query(By.css('.created-text')).nativeElement.textContent;

    expect(renderedDate).toContain(moment(someComment.created).format('Do MMMM'));
    expect(renderedDate).toContain(moment(someComment.created).format('LT'));
  });
});
