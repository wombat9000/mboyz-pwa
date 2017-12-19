import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HolidayDetailComponent} from './holiday-detail/holiday-detail.component';
import {MessageBoxComponent} from './holiday-detail/message-box/message-box.component';
import {ParticipantsComponent} from './holiday-detail/participants/participants.component';

const routes: Routes = [
  {path: 'holiday', component: HolidayDetailComponent},
  {path: 'components/message-box', component: MessageBoxComponent},
  {path: 'components/participant-box', component: ParticipantsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
