import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {click} from '../../../test-support/functions';
import * as fromAuth from '../../reducers';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import {FacebookLogin, LoginFailure} from '../../actions/auth.actions';
import {LoginPageComponent} from './login-page.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


class LoginPO {
  constructor(private fixture: ComponentFixture<LoginPageComponent>) {
    this.fixture.detectChanges();
  }

  spinner() {
    return this.fixture.debugElement.query(By.css('mat-spinner'));
  }

  errorInfo() {
    return this.fixture.debugElement.query(By.css('.login-error'));
  }

  clickFBLogin() {
    click(this.fixture.debugElement.query(By.css('.button-fb')));
  }
}

describe('Login Page', () => {
  let store: Store<fromAuth.State>;
  let fixture: ComponentFixture<LoginPageComponent>;
  let loginPO: LoginPO;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          auth: combineReducers(fromAuth.reducers),
        })
      ],
      declarations: [LoginPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach(async () => {
    store = TestBed.get(Store);

    fixture = TestBed.createComponent(LoginPageComponent);
    loginPO = new LoginPO(fixture);
    await fixture.whenStable();
  });

  describe('initial state', () => {
    it('should trigger facebook login on click', () => {
      spyOn(store, 'dispatch');

      loginPO.clickFBLogin();

      expect(store.dispatch).toHaveBeenCalledWith(new FacebookLogin());
    });

    it('should not show spinner', () => {
      fixture.detectChanges();
      expect(loginPO.spinner()).toBe(null);
    });

    it('should should not show error', () => {
      fixture.detectChanges();
      expect(loginPO.errorInfo()).toBe(null);
    });
  });

  describe('login pending', () => {
    beforeEach(() => {
      store.dispatch(new FacebookLogin());
    });

    it('should show spinner', () => {
      fixture.detectChanges();

      expect(loginPO.spinner()).toBeTruthy();
    });
  });

  describe('login failure', () => {
    beforeEach(() => {
      store.dispatch(new LoginFailure({error: 'someError'}));
    });

    it('should show error message', () => {
      fixture.detectChanges();

      const errorInfo = loginPO.errorInfo();
      expect(errorInfo.nativeElement.innerText).toContain('someError');
    });
  });
});
