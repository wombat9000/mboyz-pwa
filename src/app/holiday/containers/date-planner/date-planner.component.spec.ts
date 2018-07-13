import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DatePlannerComponent} from './date-planner.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('DatePlannerComponent', () => {
  let component: DatePlannerComponent;
  let fixture: ComponentFixture<DatePlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatePlannerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
