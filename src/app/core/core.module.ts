import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {UserFirestore} from './user-firestore.service';
import {AuthGuard} from './auth.guard';


@NgModule({
  providers: [UserFirestore, AuthService, AuthGuard],
})
export class CoreModule {
}
