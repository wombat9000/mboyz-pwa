import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HolidayDetailPageComponent} from './holiday-detail.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {HolidayService} from '../../services/holiday.service';
import {Holiday} from '../../model/holiday';
import {holidayServiceMocker} from '../../../test-support/stubs';

describe('HolidayDetailComponent', () => {
  let component: HolidayDetailPageComponent;
  let fixture: ComponentFixture<HolidayDetailPageComponent>;
  let holidayService: jasmine.SpyObj<HolidayService>;

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
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: HolidayService, useFactory: holidayServiceMocker}
      ],
      declarations: [HolidayDetailPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    holidayService = TestBed.get(HolidayService);
    holidayService.findById.and.returnValue(Observable.of(someHoliday));
    fixture = TestBed.createComponent(HolidayDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the holidays name', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(holidayService.findById).toHaveBeenCalledWith(someHoliday.id);

    const heading = fixture.debugElement.query(By.css('h1')).nativeElement.textContent;
    expect(heading).toBe(someHoliday.name);
  });
});
