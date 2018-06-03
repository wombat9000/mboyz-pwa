import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import {HolidayOverviewPageComponent} from './containers/holiday-overview/holiday-overview.component';
import {CreateHolidayPageComponent} from './containers/holiday-create/holiday-create.component';
import {SelectedHolidayPageComponent} from './containers/selected-holiday-page/selected-holiday-page.component';

const holidayRoutes: Routes = [
  {
    path: 'holiday', children: [
      {path: '', component: HolidayOverviewPageComponent, canActivate: [AuthGuard]},
      {path: 'create', component: CreateHolidayPageComponent, canActivate: [AuthGuard]},
      {path: ':id', component: SelectedHolidayPageComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(holidayRoutes)],
  exports: [RouterModule]
})
export class HolidayRoutingModule {
}
