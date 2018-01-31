import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromHoliday from './holiday/reducers';
import {HolidaysState} from './holiday/reducers';
import * as actions from './holiday/actions/holiday.actions';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<HolidaysState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          auth: combineReducers(fromHoliday.reducers),
        })
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should query for holiday changes', () => {
    expect(store.dispatch).toHaveBeenCalledWith(new actions.Query());
  });
});
