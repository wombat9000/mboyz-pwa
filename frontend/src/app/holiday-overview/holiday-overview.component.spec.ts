import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HolidayOverviewComponent} from './holiday-overview.component';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {Router} from '@angular/router';
import {RouterStub} from '../test-support/stubs';
import {click} from '../test-support/functions';

describe('HolidayOverviewComponent', () => {
  let component: HolidayOverviewComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<HolidayOverviewComponent>;

  let router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{provide: Router, useClass: RouterStub}],
      declarations: [HolidayOverviewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(HolidayOverviewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
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
