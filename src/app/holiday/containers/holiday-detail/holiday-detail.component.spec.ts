import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HolidayDetailPageComponent} from './holiday-detail.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {Holiday} from '../../models/holiday';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromHoliday from '../../reducers';
import {HolidaysState} from '../../reducers';
import * as holiday from '../../actions/holiday.actions';
import * as post from '../../actions/post.actions';
import * as auth from '../../../auth/actions/auth.actions';
import * as fromRoot from '../../../reducers';
import * as fromAuth from '../../../auth/reducers';
import {MtravelUser} from '../../../auth/services/auth.service';
import {DebugElement} from '@angular/core/src/debug/debug_node';
import {Post} from '../../models/post';
import moment = require('moment');

describe('HolidayDetailComponent', () => {
  let component: HolidayDetailPageComponent;
  let fixture: ComponentFixture<HolidayDetailPageComponent>;
  let store: Store<HolidaysState>;

  const someHoliday: Holiday = {
    id: 'someId',
    name: 'someName',
    created: ''
  };

  const somePost: Post = {
    id: 'someId',
    text: 'first message',
    holidayId: someHoliday.id,
    authorId: 'someAuthor',
    created: moment('2016-01-01').toISOString()
  };

  const moreRecentPost: Post = {
    id: 'anotherId',
    text: 'second message',
    holidayId: someHoliday.id,
    authorId: 'someAuthor',
    created: moment('2016-01-02').toISOString()
  };
  const activeUser: MtravelUser = {
    uid: 'someUid',
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

    store.dispatch(new post.Create({record: somePost}));
    store.dispatch(new post.Create({record: moreRecentPost}));
    store.dispatch(new holiday.Create({record: someHoliday}));
    store.dispatch(new holiday.Select({id: someHoliday.id}));
    store.dispatch(new auth.LoginSuccess({user: activeUser}));

    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(HolidayDetailPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should show the holidays name', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new holiday.Select({id: someHoliday.id}));

    const heading = fixture.debugElement.query(By.css('h1')).nativeElement.textContent;
    expect(heading).toBe(someHoliday.name);
  });

  it('should pass properties down to post box', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const postBox: DebugElement = fixture.debugElement.query(By.css('app-post-box'));

    expect(postBox.properties.activeUser).toBe(activeUser);
    expect(postBox.properties.holiday).toBe(someHoliday);
    expect(postBox.properties.posts[0]).toBe(moreRecentPost);
    expect(postBox.properties.posts[1]).toBe(somePost);
  });
});
