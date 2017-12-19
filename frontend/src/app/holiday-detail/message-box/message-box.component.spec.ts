import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageBoxComponent} from './message-box.component';
import {HolidayDetailModule} from '../holiday-detail.module';

describe('MessageBoxComponent', () => {
  let component: MessageBoxComponent;
  let fixture: ComponentFixture<MessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HolidayDetailModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
