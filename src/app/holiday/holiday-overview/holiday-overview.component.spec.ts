import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HolidayOverviewComponent} from './holiday-overview.component';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {Router} from '@angular/router';
import {holidayServiceMock, RouterStub} from '../../test-support/stubs';
import {click} from '../../test-support/functions';
import {Holiday, HolidayService} from '../holiday.service';
import {Subject} from 'rxjs/Subject';

describe('HolidayOverviewComponent', () => {
  let component: HolidayOverviewComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<HolidayOverviewComponent>;

  let router;
  let holidayService: jasmine.SpyObj<HolidayService>;
  let holidayEmmiter: Subject<Holiday[]>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useClass: RouterStub},
        {provide: HolidayService, useValue: holidayServiceMock},
      ],
      declarations: [HolidayOverviewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    holidayService = TestBed.get(HolidayService);
    holidayEmmiter = new Subject<Holiday[]>();
    holidayService.getHolidays.and.returnValue(holidayEmmiter);
    fixture = TestBed.createComponent(HolidayOverviewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('displays holidays', () => {
    const someHoliday = new Holiday('someId', 'first holiday');
    const anotherHoliday = new Holiday('anotherId', 'another holiday');

    beforeEach(async () => {
      holidayEmmiter.next([someHoliday, anotherHoliday]);
      await fixture.whenStable();
      fixture.detectChanges();
    });

    it('should display all holidays', () => {
      const cards = debugElement.queryAll(By.css('.holiday-name'))
        .map(it => it.nativeElement.textContent);

      expect(cards).toEqual([someHoliday.name, anotherHoliday.name]);
    });

    describe('onClick', () => {
      it('should take user to holiday detail', () => {
        const spy = spyOn(router, 'navigateByUrl');

        const someHolidayCard = debugElement.queryAll(By.css('.holiday-name'))
          .find(it => it.nativeElement.textContent === someHoliday.name);

        click(someHolidayCard.nativeElement);

        const destinationURL = spy.calls.first().args[0];
        expect(destinationURL).toBe(`/holiday/${someHoliday.id}`);
      });
    });
  });

  describe('add button', () => {
    it('should show an add button', () => {
      const addButton = debugElement.query(By.css('.add-holiday'));
      expect(addButton).toBeTruthy();
    });

    it('should redirect to create holiday page onclick', () => {
      const spy = spyOn(router, 'navigateByUrl');
      const addButton = debugElement.query(By.css('.add-holiday'));

      click(addButton);

      const destinationURL = spy.calls.first().args[0];
      expect(destinationURL).toBe('/holiday/create');
    });
  });
});
