import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HolidayOverviewPageComponent} from './holiday-overview.component';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {Router} from '@angular/router';
import {click} from '../../../test-support/functions';
import {combineReducers, Store, StoreModule} from '@ngrx/store';

import * as fromHoliday from '../../reducers';
import * as actions from '../../actions/holiday.actions';
import * as moment from 'moment';
import {routerMocker} from '../../../test-support/stubs';

describe('HolidayOverviewComponent', () => {
  let component: HolidayOverviewPageComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<HolidayOverviewPageComponent>;

  let router: Router;
  let store: Store<fromHoliday.State>;

  const firstHoliday = {id: 'someId', name: 'first created holiday', created: moment('2018-12-01').toISOString()};
  const moreRecentHoliday = {
    id: 'anotherId',
    name: 'more recently created holiday',
    created: moment('2018-12-02').toISOString()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          holidayPlanner: combineReducers(fromHoliday.reducers)
        })
      ],
      providers: [
        {
          provide: Router, useFactory: routerMocker
        },
      ],
      declarations: [HolidayOverviewPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    store = TestBed.get(Store);

    store.dispatch(new actions.Create({record: firstHoliday}));
    store.dispatch(new actions.Create({record: moreRecentHoliday}));

    fixture = TestBed.createComponent(HolidayOverviewPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('displays holidays', () => {
    beforeEach(async () => {
      await fixture.whenStable();
      fixture.detectChanges();
    });

    it('should compile', () => {
      expect(fixture).toMatchSnapshot();
    });

    it('should display all holidays, sorted by date', () => {
      const cards = debugElement.queryAll(By.css('.holiday-name'))
        .map(it => it.nativeElement.textContent);

      expect(cards).toEqual([moreRecentHoliday.name, firstHoliday.name]);
    });

    describe('onClick', () => {
      it('should take user to holiday detail', () => {
        const someHolidayCard = debugElement.queryAll(By.css('.holiday-name'))
          .find(it => it.nativeElement.textContent === firstHoliday.name);

        if (someHolidayCard) {
          click(someHolidayCard.nativeElement);
          const destinationURL = router.navigateByUrl.mock.calls[0][0];
          expect(destinationURL).toBe(`/holiday/${firstHoliday.id}`);
        } else {
          fail();
        }
      });
    });
  });

  describe('add button', () => {
    it('should show an add button', () => {
      const addButton = debugElement.query(By.css('.add-holiday'));
      expect(addButton).toBeTruthy();
    });

    it('should link to create page', () => {
      const addButton = debugElement.query(By.css('.add-holiday'));
      expect(addButton.attributes.routerLink).toBe('/holiday/create');
    });

    xit('should redirect to create holiday page onclick', () => {
      const addButton = debugElement.query(By.css('.add-holiday'));

      click(addButton);
      const destinationURL = router.navigateByUrl.mock.calls[0][0];
      expect(destinationURL).toBe(`/holiday/create`);
    });
  });
});
