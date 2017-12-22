import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HolidayOverviewComponent} from './holiday-overview.component';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {Router} from '@angular/router';
import {holidayServiceMock, RouterStub} from '../test-support/stubs';
import {click} from '../test-support/functions';
import {Holiday, HolidayService} from '../holiday.service';

describe('HolidayOverviewComponent', () => {
  let component: HolidayOverviewComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<HolidayOverviewComponent>;

  let router;
  let holidayService: jasmine.SpyObj<HolidayService>;

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
    holidayService.getHolidays.and.returnValue([]);
    fixture = TestBed.createComponent(HolidayOverviewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('displays holidays', () => {

    const someholiday = new Holiday('someId', 'first holiday', []);
    const anotherHoliday = new Holiday('anotherId', 'another holiday', []);

    beforeEach(() => {
      holidayService.getHolidays.and.returnValue([someholiday, anotherHoliday]);
      component.ngOnInit();
    });

    it('should display all holidays', () => {
      fixture.detectChanges();

      const cards = debugElement.queryAll(By.css('.holiday-card-title'))
        .map(it => it.nativeElement.textContent);

      expect(cards).toEqual([someholiday.name, anotherHoliday.name]);
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
