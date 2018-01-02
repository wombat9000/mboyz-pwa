import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HolidayOverviewComponent} from './holiday/holiday-overview/holiday-overview.component';
import {HolidayCreateComponent} from './holiday/holiday-create/holiday-create.component';
import {LoginComponent} from './login/login.component';
import {HolidayDetailComponent} from './holiday/holiday-detail/holiday-detail.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', component: HolidayOverviewComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'holiday/create', component: HolidayCreateComponent, canActivate: [AuthGuard]},
  {path: 'holiday/:id', component: HolidayDetailComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
