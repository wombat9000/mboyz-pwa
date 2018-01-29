import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateHolidayPageComponent} from './holiday-create.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromHoliday from '../../reducers/index';
import {State} from '../../reducers/holiday.reducer';
import {Holiday} from '../../model/holiday';
import * as moment from 'moment';
import {click} from '../../../test-support/functions';
import {routerMocker} from '../../../test-support/stubs';


class HolidayCreatePO {
  constructor(private fixture: ComponentFixture<CreateHolidayPageComponent>) {
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
  let fixture: ComponentFixture<CreateHolidayPageComponent>;
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
        {provide: Router, useFactory: routerMocker}
      ],
      declarations: [CreateHolidayPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHolidayPageComponent);
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
      const expectedHoliday = {id: 'someId', name: 'Nicer Skiurlaub'};
      const actualHoliday: Holiday = store.dispatch.calls.argsFor(0)[0].holiday;

      expect(actualHoliday.name).toBe(expectedHoliday.name);
      expect(actualHoliday.created).toBeDefined();
      expect(moment(actualHoliday.created).format('Do MMMM')).toBe(moment().format('Do MMMM'));
    });

    it('should redirect to holiday overview after form was submitted', () => {
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
