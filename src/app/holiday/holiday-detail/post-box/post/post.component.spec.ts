import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostComponent} from './post.component';
import {Post} from '../../../services/post-firestore.service';
import {UserFirestore} from '../../../../auth/services/user-firestore.service';
import {userFirestoreMocker} from '../../../../test-support/stubs';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../../auth/services/auth.service';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import moment = require('moment');

describe('PostComponent', () => {
  let component: PostComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<PostComponent>;
  let userFS: jasmine.SpyObj<UserFirestore>;

  const someUser: User = {
    uid: 'someAuthorId',
    displayName: 'someDisplayName',
    photoURL: 'somePhotoUrl',
    email: 'someEmail'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{provide: UserFirestore, useFactory: userFirestoreMocker}],
      declarations: [PostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));
  const somePost: Post = {
    id: 'someId',
    authorId: 'someAuthorId',
    holidayId: 'holidayId',
    text: 'someMessage',
    created: moment().toISOString()
  };

  beforeEach(() => {
    userFS = TestBed.get(UserFirestore);
    userFS.observeById.and.returnValue(Observable.of(someUser));
    fixture = TestBed.createComponent(PostComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    component.post = somePost;
    fixture.detectChanges();
  });

  it('should show the message', async () => {
    await fixture.whenStable();
    const message = debugElement.query(By.css('.message')).nativeElement.textContent;

    expect(message).toBe(somePost.text);
  });

  it('should show the username for given id', async () => {
    await fixture.whenStable();
    const author = debugElement.query(By.css('.author')).nativeElement.textContent;

    expect(userFS.observeById).toHaveBeenCalledWith(somePost.authorId);
    expect(author).toBe(someUser.displayName);
  });

  it('post should have a timestamp', async () => {
    await fixture.whenStable();
    const renderedDate = debugElement.query(By.css('.created-text')).nativeElement.textContent;

    expect(renderedDate).toContain(moment(somePost.created).format('Do MMMM'));
    expect(renderedDate).toContain(moment(somePost.created).format('LT'));
  });

  it('should render comment box for given post', () => {
    const commentBox = debugElement.query(By.css('app-comment-box'));

    expect(commentBox.properties.post).toBe(somePost);
  });
})
;
