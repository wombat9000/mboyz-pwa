import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HolidayDetailPageComponent} from './holiday-detail.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {Holiday} from '../../model/holiday';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromHoliday from '../../../holiday/reducers';
import {HolidaysState} from '../../reducers';
import {Select} from '../../actions/holiday.actions';

describe('HolidayDetailComponent', () => {
  let component: HolidayDetailPageComponent;
  let fixture: ComponentFixture<HolidayDetailPageComponent>;
  let store: Store<HolidaysState>;

  const someHoliday: Holiday = {id: 'someId', name: 'someName'};

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
          auth: combineReducers(fromHoliday.reducers),
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
    spyOn(store, 'select').and.returnValue(Observable.of(someHoliday));
    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(HolidayDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the holidays name', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(new Select({id: someHoliday.id}));

    const heading = fixture.debugElement.query(By.css('h1')).nativeElement.textContent;
    expect(heading).toBe(someHoliday.name);
  });
});
