import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HolidayDetailPageComponent} from './holiday-detail.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {HolidayDTO} from '../../models/holiday';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromHoliday from '../../reducers';
import {HolidaysState} from '../../reducers';
import * as fromRoot from '../../../reducers';
import * as fromAuth from '../../../auth/reducers';
import {MtravelUser} from '../../../auth/services/auth.service';
import {DebugElement} from '@angular/core/src/debug/debug_node';
import {PostDTO} from '../../models/post';
import {SetTitle} from '../../../core/actions/app-bar.actions';
import moment = require('moment');

describe('HolidayDetailComponent', () => {
  let component: HolidayDetailPageComponent;
  let fixture: ComponentFixture<HolidayDetailPageComponent>;
  let store: Store<HolidaysState>;

  const someHoliday: HolidayDTO = {
    id: 'someId',
    name: 'someName',
    created: ''
  };

  const somePost: PostDTO = {
    id: 'someId',
    text: 'first message',
    holidayId: someHoliday.id,
    authorId: 'someAuthor',
    created: moment('2016-01-01').toISOString()
  };

  const moreRecentPost: PostDTO = {
    id: 'anotherId',
    text: 'second message',
    holidayId: someHoliday.id,
    authorId: 'someAuthor',
    created: moment('2016-01-02').toISOString()
  };
  const activeUser: MtravelUser = {
    id: 'someUid',
    email: null,
    displayName: null,
    photoURL: null
  };

  const snapshot = {
    paramMap: new Map([
      ['id', someHoliday.id]
    ])
  };

  const activatedRoute = {
    snapshot: snapshot
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'holidayPlanner': combineReducers(fromHoliday.reducers),
          'auth': combineReducers(fromAuth.reducers)
        })
      ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
      ],
      declarations: [HolidayDetailPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    store = TestBed.get(Store);

    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(HolidayDetailPageComponent);
    fixture.componentInstance.posts = [moreRecentPost, somePost];
    fixture.componentInstance.activeUser = activeUser;
    fixture.componentInstance.holiday = someHoliday;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should set title to overview', () => {
    expect(store.dispatch).toHaveBeenCalledWith(new SetTitle({newTitle: 'overview'}));
  });

  it('should show the holidays name', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const heading = fixture.debugElement.query(By.css('h1')).nativeElement.textContent;
    expect(heading).toBe(someHoliday.name);
  });

  it('should pass properties down to post box', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const postBox: DebugElement = fixture.debugElement.query(By.css('app-forum'));

    expect(postBox.properties.activeUser).toBe(activeUser);
    expect(postBox.properties.holiday).toBe(someHoliday);
    expect(postBox.properties.posts[0]).toBe(moreRecentPost);
    expect(postBox.properties.posts[1]).toBe(somePost);
  });
});
