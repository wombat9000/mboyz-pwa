import {NgModule} from '@angular/core';
import {UserFirestore} from './services/user-firestore.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {AppMaterialModule} from '../common/app-material.module';


@NgModule({
  imports: [AppMaterialModule],
  providers: [UserFirestore, AuthService, AuthGuard],
  declarations: [LoginComponent]
})
export class AuthModule {
}
