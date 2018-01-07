import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentComponent} from './comment.component';
import {userFirestoreMock} from '../../../../../../test-support/stubs';
import {UserFirestore} from '../../../../../../core/user-firestore.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../../../../core/auth.service';
import {Comment} from '../../../../../post-firestore.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import moment = require('moment');

describe('CommentComponent', () => {
  let component: CommentComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<CommentComponent>;

  const someUser: User = {
    uid: 'someAuthorId',
    displayName: 'someDisplayName',
    photoURL: 'somePhotoUrl',
    email: 'someEmail'
  };

  const someComment: Comment = {
    id: 'someId',
    postId: 'somePost',
    holidayId: 'someHolidayId',
    authorId: 'someAuthor',
    text: 'someMessage',
    created: moment(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserFirestore,
          useValue: userFirestoreMock
        }
      ],
      declarations: [CommentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    userFirestoreMock.observeById.and.returnValue(Observable.of(someUser));
    fixture = TestBed.createComponent(CommentComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    component.comment = someComment;
    fixture.detectChanges();
  });

  it('should show the username for given id', async () => {
    await fixture.whenStable();
    const author = debugElement.query(By.css('.author')).nativeElement.textContent;

    expect(userFirestoreMock.observeById).toHaveBeenCalledWith(someComment.authorId);
    expect(author).toBe(someUser.displayName);
  });

  it('should show the text of the comment', async () => {
    await fixture.whenStable();
    const message = debugElement.query(By.css('.message')).nativeElement.textContent;

    expect(message).toBe(someComment.text);
  });

  it('post should have a timestamp', async () => {
    await fixture.whenStable();
    const renderedDate = debugElement.query(By.css('.created-text')).nativeElement.textContent;

    expect(renderedDate).toContain(someComment.created.format('Do MMMM'));
    expect(renderedDate).toContain(someComment.created.format('LT'));
  });
});
