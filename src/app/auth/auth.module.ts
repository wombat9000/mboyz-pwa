import {ModuleWithProviders, NgModule} from '@angular/core';
import {UserFirestore} from './services/user-firestore.service';
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
  providers: [UserFirestore, AuthService, AuthGuard],
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
    AuthModule,
    RouterModule.forChild([{path: 'login', component: LoginPageComponent}]),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class RootAuthModule {
}
