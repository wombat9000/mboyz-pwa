import {NgModule} from '@angular/core';
import {UserFirestore} from './services/user-firestore.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {MaterialModule} from '../material';


@NgModule({
  imports: [MaterialModule],
  providers: [UserFirestore, AuthService, AuthGuard],
  declarations: [LoginComponent]
})
export class AuthModule {
}
