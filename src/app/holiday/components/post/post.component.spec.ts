import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostComponent} from './post.component';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {MtravelUser} from '../../../auth/services/auth.service';
import {PostDTO} from '../../models/post';
import {combineReducers, StoreModule} from '@ngrx/store';
import * as fromHoliday from '../../reducers';
import moment = require('moment');

describe('PostComponent', () => {
  let component: PostComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<PostComponent>;

  const someUser: MtravelUser = {
    id: 'someAuthorId',
    displayName: 'someDisplayName',
    photoURL: 'somePhotoUrl',
    email: 'someEmail'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          holidayPlanner: combineReducers(fromHoliday.reducers),
        })
      ],
      declarations: [PostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));
  const somePost: PostDTO = {
    id: 'someId',
    authorId: 'someAuthorId',
    holidayId: 'holidayId',
    text: 'someMessage',
    created: moment().toISOString()
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    component.post = somePost;
    component.author = someUser;
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
