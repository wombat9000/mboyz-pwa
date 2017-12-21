import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HolidayDetailComponent} from './holiday-detail/holiday-detail.component';
import {PostBoxComponent} from './holiday-detail/post-box/post-box.component';
import {ParticipantsComponent} from './holiday-detail/participants/participants.component';

const routes: Routes = [
  {path: 'holiday', component: HolidayDetailComponent},
  {path: 'components/post-box', component: PostBoxComponent},
  {path: 'components/participant-box', component: ParticipantsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
