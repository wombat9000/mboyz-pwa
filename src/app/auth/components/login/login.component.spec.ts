import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AuthService} from '../../services/auth.service';
import {authServiceMock} from '../../../test-support/stubs';
import {By} from '@angular/platform-browser';
import {click} from '../../../test-support/functions';


class LoginPO {
  constructor(private fixture: ComponentFixture<LoginComponent>) {
  }

  clickFBLogin() {
    click(this.fixture.debugElement.query(By.css('.button-fb')));
  }
}

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let loginPO: LoginPO;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{provide: AuthService, useValue: authServiceMock}
      ],
      declarations: [LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loginPO = new LoginPO(fixture);

    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should trigger facebook login on click', () => {
    loginPO.clickFBLogin();
    expect(authService.facebookLogin).toHaveBeenCalled();
  });
});
