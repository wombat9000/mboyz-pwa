import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserMenuComponent} from './user-menu.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers/index';
import {BgImageDirective} from './bg-image.directive';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MtravelUser} from '../../../auth/services/auth.service';
import {By} from '@angular/platform-browser';
import {click} from '../../../test-support/functions';
import {MatMenuModule} from '@angular/material';
import {Logout} from '../../../auth/actions/auth.actions';


class UserMenuPageObject {
  constructor(public fixture: ComponentFixture<UserMenuComponent>, user: MtravelUser) {
    fixture.componentInstance.user = user;
    fixture.detectChanges();
  }

  menuTrigger() {
    return this.fixture.debugElement.query(By.css('button[data-qa="user-menu-trigger"]'));
  }

  logoutButton() {
    return this.fixture.debugElement.query(By.css('button[data-qa="btn-logout"]'));
  }

  menu() {
    return this.fixture.debugElement.query(By.css('mat-menu'));
  }

  openMenu(): UserMenuPageObject {
    click(this.menuTrigger());
    this.fixture.detectChanges();
    return this;
  }
}

describe('User Menu', () => {
  let store: Store<fromAuth.State>;
  let userMenu: UserMenuPageObject;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        NoopAnimationsModule,
        StoreModule.forRoot({
          auth: combineReducers(fromAuth.reducers),
        })],
      declarations: [UserMenuComponent, BgImageDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);

    const someUser: MtravelUser = {
      uid: '',
      email: '',
      displayName: null,
      photoURL: null
    };

    const fixture = TestBed.createComponent(UserMenuComponent);
    userMenu = new UserMenuPageObject(fixture, someUser);
  });

  describe('initial menu state', () => {
    it('should a menu trigger', () => {
      expect(userMenu.menuTrigger()).toBeTruthy();
    });

    it('should have a menu', () => {
      expect(userMenu.menu()).toBeTruthy();
    });

    it('should be closed', () => {
      expect(userMenu.logoutButton()).toBe(null);
    });
  });

  describe('opening the menu', () => {
    beforeEach(() => {
      userMenu.openMenu();
    });

    it('should show logout button', () => {
      expect(userMenu.logoutButton()).toBeTruthy();
    });

    it('should logout on click', () => {
      spyOn(store, 'dispatch');
      click(userMenu.logoutButton());

      expect(store.dispatch).toHaveBeenCalledWith(new Logout());
    });
  });
});
