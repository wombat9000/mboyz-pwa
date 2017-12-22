import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HolidayCreateComponent} from './holiday-create.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Holiday, HolidayService} from '../holiday.service';
import {click} from '../test-support/functions';
import {holidayServiceMock} from '../test-support/stubs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('HolidayCreateComponent', () => {
  let component: HolidayCreateComponent;
  let fixture: ComponentFixture<HolidayCreateComponent>;
  let debugElement: DebugElement;

  let holidayService: jasmine.SpyObj<HolidayService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatButtonModule
      ],
      providers: [{
        provide: HolidayService,
        useValue: holidayServiceMock
      }],
      declarations: [HolidayCreateComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayCreateComponent);
    holidayService = TestBed.get(HolidayService);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should provide an input field for name', () => {
    const nameInput = debugElement.query(By.css('[name="name"]'));
    expect(nameInput).toBeTruthy();
  });

  it('should create the holiday when submitting the form', async () => {
    await fixture.whenStable();

    const nameInput = debugElement.query(By.css('[name="name"]'));
    nameInput.nativeElement.value = 'Nicer Skiurlaub';
    nameInput.nativeElement.dispatchEvent(new Event('input'));

    const submitButton = debugElement.query(By.css('button[type="submit"]')).nativeElement;
    click(submitButton);

    const expectedHoliday = new Holiday('Nicer Skiurlaub', []);

    expect(holidayService.create).toHaveBeenCalledWith(expectedHoliday);
  });
});
