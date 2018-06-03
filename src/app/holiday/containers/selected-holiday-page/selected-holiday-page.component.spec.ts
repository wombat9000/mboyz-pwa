import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedHolidayPageComponent } from './selected-holiday-page.component';

xdescribe('SelectedHolidayPageComponent', () => {
  let component: SelectedHolidayPageComponent;
  let fixture: ComponentFixture<SelectedHolidayPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedHolidayPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedHolidayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
