import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentComponent} from './comment.component';
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
    created: moment('2016-01-01').toISOString(),
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

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
