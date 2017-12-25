import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HolidayDetailComponent} from './holiday-detail.component';
import {HolidayModule} from '../holiday.module';

xdescribe('HolidayDetailComponent', () => {
  let component: HolidayDetailComponent;
  let fixture: ComponentFixture<HolidayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HolidayModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
