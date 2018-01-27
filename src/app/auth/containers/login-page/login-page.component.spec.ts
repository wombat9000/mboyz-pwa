import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {storeMocker} from '../../../test-support/stubs';
import {By} from '@angular/platform-browser';
import {click} from '../../../test-support/functions';
import * as fromAuth from '../../reducers';
import {Store} from '@ngrx/store';
import {FbLogin} from '../../actions/auth.actions';
import {LoginPageComponent} from './login-page.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


class LoginPO {
  constructor(private fixture: ComponentFixture<LoginPageComponent>) {
    this.fixture.detectChanges();
  }

  spinner() {
    return this.fixture.debugElement.query(By.css('mat-spinner'));
  }

  clickFBLogin() {
    click(this.fixture.debugElement.query(By.css('.button-fb')));
  }
}

describe('Login Page', () => {
  let storeMock: jasmine.SpyObj<Store<fromAuth.State>>;
  let fixture: ComponentFixture<LoginPageComponent>;
  let loginPO: LoginPO;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        {provide: Store, useValue: storeMocker<fromAuth.State>()},
      ],
      declarations: [LoginPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  const pending$ = new Subject<boolean>();

  beforeEach(async () => {
    storeMock = TestBed.get(Store);
    storeMock.select.and.returnValue(pending$);
    pending$.next(false);

    fixture = TestBed.createComponent(LoginPageComponent);
    loginPO = new LoginPO(fixture);
    await fixture.whenStable();
  });

  it('should trigger facebook login on click', () => {
    loginPO.clickFBLogin();
    expect(storeMock.dispatch).toHaveBeenCalledWith(new FbLogin());
  });

  describe('spinner', () => {
    it('should not show spinner when login not pending', () => {
      pending$.next(false);
      fixture.detectChanges();

      expect(loginPO.spinner()).toBe(null);
    });

    it('should show spinner', () => {
      pending$.next(true);
      fixture.detectChanges();

      expect(loginPO.spinner()).toBeTruthy();
    });
  });
});
