import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DateSuggestComponent} from './date-suggest.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MaterialModule} from '../../../material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DateSuggestComponent', () => {
  let component: DateSuggestComponent;
  let fixture: ComponentFixture<DateSuggestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
      declarations: [DateSuggestComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
