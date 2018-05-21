import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers';
import {HolidaysState} from '../../holiday/reducers';
import {LoginSuccess, Logout} from '../../auth/actions/auth.actions';
import {newTestUser} from '../../auth/services/auth.service';
import {Query, QueryStop} from '../actions/data.actions';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<HolidaysState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          auth: combineReducers(fromAuth.reducers),
        })
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should query for holiday changes', () => {
    store.dispatch(new LoginSuccess({user: newTestUser()}));
    spyOn(store, 'dispatch');

    fixture.componentInstance.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(new Query());
  });

  it('should stop querying when logged out', () => {
    store.dispatch(new Logout());
    spyOn(store, 'dispatch');

    fixture.componentInstance.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(new QueryStop());
  });
});
