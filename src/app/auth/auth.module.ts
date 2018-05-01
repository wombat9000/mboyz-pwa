import {ModuleWithProviders, NgModule} from '@angular/core';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth.guard';
import {MaterialModule} from '../material';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './effects/auth.effects';
import {LoginPageComponent} from './containers/login-page/login-page.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule, MaterialModule],
  providers: [UserService, AuthService, AuthGuard],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [AuthService, AuthGuard],
    };
  }
}

@NgModule({
  imports: [
    RouterModule.forChild([{path: 'login', component: LoginPageComponent}]),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
    AuthModule,
  ],
})
export class RootAuthModule {
}
