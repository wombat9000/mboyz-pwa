import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HolidayOverviewComponent} from './holiday-overview/holiday-overview.component';
import {AuthGuard} from '../auth/services/auth.guard';
import {HolidayCreateComponent} from './holiday-create/holiday-create.component';
import {HolidayDetailComponent} from './holiday-detail/holiday-detail.component';

const holidayRoutes: Routes = [
  {
    path: 'holiday', children: [
      {path: '', component: HolidayOverviewComponent, canActivate: [AuthGuard]},
      {path: 'create', component: HolidayCreateComponent, canActivate: [AuthGuard]},
      {path: ':id', component: HolidayDetailComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(holidayRoutes)],
  exports: [RouterModule]
})
export class HolidayRoutingModule {
}
