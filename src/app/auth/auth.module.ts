import {NgModule} from '@angular/core';
import {UserFirestore} from './services/user-firestore.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {MaterialModule} from '../material';
import {StoreModule} from '@ngrx/store';
import {reducer} from './reducers/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './effects/auth.effects';


@NgModule({
  imports: [MaterialModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [UserFirestore, AuthService, AuthGuard],
  declarations: [LoginComponent]
})
export class AuthModule {
}
