import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {UserFirestore} from './user-firestore.service';
import {AuthGuard} from '../auth.guard';


@NgModule({
  providers: [AuthService, UserFirestore, AuthGuard],
})
export class CoreModule {
}
