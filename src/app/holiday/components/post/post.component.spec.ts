import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostComponent} from './post.component';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import moment = require('moment');
import {UserService} from '../../../auth/services/user.service';
import {MtravelUser} from '../../../auth/services/auth.service';
import {userFirestoreMocker} from '../../../test-support/stubs';
import {Post} from '../../models/post';
import {of} from 'rxjs/index';

describe('PostComponent', () => {
  let component: PostComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<PostComponent>;
  let userFS: jasmine.SpyObj<UserService>;

  const someUser: MtravelUser = {
    uid: 'someAuthorId',
    displayName: 'someDisplayName',
    photoURL: 'somePhotoUrl',
    email: 'someEmail'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{provide: UserService, useFactory: userFirestoreMocker}],
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
    userFS = TestBed.get(UserService);
    userFS.observeById.and.returnValue(of(someUser));
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

  it('should show the username for given id with space', async () => {
    await fixture.whenStable();
    const author = debugElement.query(By.css('.author')).nativeElement.textContent;

    expect(userFS.observeById).toHaveBeenCalledWith(somePost.authorId);
    expect(author).toBe(someUser.displayName + ' ');
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
});
