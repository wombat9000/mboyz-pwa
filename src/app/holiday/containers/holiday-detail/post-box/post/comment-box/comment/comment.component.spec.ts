import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentComponent} from './comment.component';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import moment = require('moment');
import {UserFirestore} from '../../../../../../../auth/services/user-firestore.service';
import {User} from '../../../../../../../auth/services/auth.service';
import {userFirestoreMocker} from '../../../../../../../test-support/stubs';
import {Comment} from '../../../../../../services/comment-firestore.service';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<CommentComponent>;
  let userFS: jasmine.SpyObj<UserFirestore>;

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
    created: moment().toISOString(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserFirestore,
          useFactory: userFirestoreMocker
        }
      ],
      declarations: [CommentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    userFS = TestBed.get(UserFirestore);
    userFS.observeById.and.returnValue(Observable.of(someUser));
    fixture = TestBed.createComponent(CommentComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    component.comment = someComment;
    fixture.detectChanges();
  });

  it('should show the username for given id', async () => {
    await fixture.whenStable();
    const author = debugElement.query(By.css('.author')).nativeElement.textContent;

    expect(userFS.observeById).toHaveBeenCalledWith(someComment.authorId);
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

    expect(renderedDate).toContain(moment(someComment.created).format('Do MMMM'));
    expect(renderedDate).toContain(moment(someComment.created).format('LT'));
  });
});
