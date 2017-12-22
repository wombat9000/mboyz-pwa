import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ParticipantsComponent} from './participants.component';
import {HolidayDetailModule} from '../holiday-detail.module';

xdescribe('ParticipantsComponent', () => {
  let component: ParticipantsComponent;
  let fixture: ComponentFixture<ParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HolidayDetailModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
