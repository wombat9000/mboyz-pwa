import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostBoxComponent} from './holiday-detail/post-box/post-box.component';
import {ParticipantsComponent} from './holiday-detail/participants/participants.component';
import {HolidayOverviewComponent} from './holiday-overview/holiday-overview.component';
import {HolidayCreateComponent} from './holiday-create/holiday-create.component';

const routes: Routes = [
  {path: '', component: HolidayOverviewComponent},
  {path: 'holiday/create', component: HolidayCreateComponent},
  {path: 'components/post-box', component: PostBoxComponent},
  {path: 'components/participant-box', component: ParticipantsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
