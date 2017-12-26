import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HolidayOverviewComponent} from './holiday/holiday-overview/holiday-overview.component';
import {HolidayCreateComponent} from './holiday/holiday-create/holiday-create.component';
import {LoginComponent} from './login/login.component';
import {PostBoxComponent} from './holiday/holiday-detail/post-box/post-box.component';
import {HolidayDetailComponent} from './holiday/holiday-detail/holiday-detail.component';
import {ParticipantsComponent} from './holiday/holiday-detail/participants/participants.component';

const routes: Routes = [
  {path: '', component: HolidayOverviewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'holiday/create', component: HolidayCreateComponent},
  {path: 'holiday/:id', component: HolidayDetailComponent},
  {path: 'components/post-box', component: PostBoxComponent},
  {path: 'components/participant-box', component: ParticipantsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
