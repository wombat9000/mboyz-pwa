import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserMenuComponent} from './user-menu.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Store} from '@ngrx/store';
import {authServiceMocker, storeMocker} from '../../test-support/stubs';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import {AuthService} from '../../auth/services/auth.service';
import {BgImageDirective} from './bg-image.directive';
import {MatMenuModule} from '@angular/material';


class UserMenuPO {
  constructor(fixture: ComponentFixture<UserMenuComponent>) {
  }
}

xdescribe('UserMenuComponent', () => {
  let fixture: ComponentFixture<UserMenuComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      providers: [
        {provide: Store, useValue: storeMocker<fromAuth.State>()},
        {provide: AuthService, useFactory: authServiceMocker}
      ],
      declarations: [UserMenuComponent, BgImageDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthService);

    fixture = TestBed.createComponent(UserMenuComponent);
    fixture.detectChanges();
  });

  // TODO: introduce userMenuState actions/reducer
  // describe('user not authenticated', () => {
  //   beforeEach(() => {
  //     authService.user$ = Observable.of<User>(null);
  //   });
  // });
});
