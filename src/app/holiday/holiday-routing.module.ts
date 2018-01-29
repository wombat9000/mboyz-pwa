import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import {HolidayOverviewPageComponent} from './containers/holiday-overview/holiday-overview.component';
import {CreateHolidayPageComponent} from './containers/holiday-create/holiday-create.component';
import {HolidayDetailPageComponent} from './containers/holiday-detail/holiday-detail.component';

const holidayRoutes: Routes = [
  {
    path: 'holiday', children: [
      {path: '', component: HolidayOverviewPageComponent, canActivate: [AuthGuard]},
      {path: 'create', component: CreateHolidayPageComponent, canActivate: [AuthGuard]},
      {path: ':id', component: HolidayDetailPageComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(holidayRoutes)],
  exports: [RouterModule]
})
export class HolidayRoutingModule {
}
