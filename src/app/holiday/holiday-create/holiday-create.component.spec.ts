import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HolidayCreateComponent} from './holiday-create.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Holiday} from '../holiday.service';
import {click} from '../../test-support/functions';
import {routerMock} from '../../test-support/stubs';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromHoliday from '../reducers';
import {State} from '../reducers/holiday.reducer';


class HolidayCreatePO {
  constructor(private fixture: ComponentFixture<HolidayCreateComponent>) {
  }

  fillName(name: string) {
    const nameInput = this.fixture.debugElement.query(By.css('[name="name"]'));
    nameInput.nativeElement.value = name;
    nameInput.nativeElement.dispatchEvent(new Event('input'));
    return this;
  }

  submit() {
    const submitButton = this.fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    click(submitButton);
    return this;
  }
}

describe('HolidayCreateComponent', () => {
  let fixture: ComponentFixture<HolidayCreateComponent>;
  let debugElement: DebugElement;

  let store: jasmine.SpyObj<Store<State>>;

  let router: jasmine.SpyObj<Router>;

  let holidayCreatePO: HolidayCreatePO;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        StoreModule.forRoot({
          'holiday': combineReducers(fromHoliday.reducers)
        }),
      ],
      providers: [
        {provide: Router, useValue: routerMock}
      ],
      declarations: [HolidayCreateComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayCreateComponent);
    holidayCreatePO = new HolidayCreatePO(fixture);

    router = TestBed.get(Router);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should provide an input field for name', () => {
    const nameInput = debugElement.query(By.css('[name="name"]'));
    expect(nameInput).toBeTruthy();
  });

  describe('submitting the form', () => {
    beforeEach(async () => {
      await fixture.whenStable();
      holidayCreatePO.fillName('Nicer Skiurlaub')
        .submit();
    });

    it('should create the holiday when submitting the form', () => {
      const expectedHoliday = new Holiday('someId', 'Nicer Skiurlaub');
      const actualHoliday: Holiday = store.dispatch.calls.argsFor(0)[0].holiday;

      expect(actualHoliday.name).toBe(expectedHoliday.name);
    });

    it('should redirect to holiday overview after form was submitted', () => {
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
