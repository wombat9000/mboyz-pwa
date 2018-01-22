import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {storeMocker} from '../../../test-support/stubs';
import {By} from '@angular/platform-browser';
import {click} from '../../../test-support/functions';
import * as fromAuth from '../../reducers/auth.reducer';
import {Store} from '@ngrx/store';
import {FbLogin} from '../../actions/auth.actions';


class LoginPO {
  constructor(private fixture: ComponentFixture<LoginComponent>) {
  }

  clickFBLogin() {
    click(this.fixture.debugElement.query(By.css('.button-fb')));
  }
}

describe('LoginComponent', () => {

  let storeMock: jasmine.SpyObj<Store<fromAuth.State>>;
  let fixture: ComponentFixture<LoginComponent>;
  let loginPO: LoginPO;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Store, useValue: storeMocker<fromAuth.State>()},
      ],
      declarations: [LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loginPO = new LoginPO(fixture);

    storeMock = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should trigger facebook login on click', () => {
    loginPO.clickFBLogin();
    expect(storeMock.dispatch).toHaveBeenCalledWith(new FbLogin());
  });
});
