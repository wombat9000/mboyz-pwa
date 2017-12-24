import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostBoxComponent} from './holiday-detail/post-box/post-box.component';
import {ParticipantsComponent} from './holiday-detail/participants/participants.component';
import {HolidayOverviewComponent} from './holiday-overview/holiday-overview.component';
import {HolidayCreateComponent} from './holiday-create/holiday-create.component';
import {HolidayDetailComponent} from './holiday-detail/holiday-detail.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', component: HolidayOverviewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'holiday/create', component: HolidayCreateComponent},
  {path: 'holiday/:id', component: HolidayDetailComponent},
  {path: 'components/post-box', component: PostBoxComponent},
  {path: 'components/participant-box', component: ParticipantsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
