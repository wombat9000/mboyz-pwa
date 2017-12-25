import {NgModule} from '@angular/core';

import {
  MatButtonModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatListModule,
  MatNativeDateModule, MatTabsModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PostBoxComponent} from './holiday-detail/post-box/post-box.component';
import {HolidayDetailComponent} from './holiday-detail/holiday-detail.component';
import {ParticipantsComponent} from './holiday-detail/participants/participants.component';
import {CommentBoxComponent} from './holiday-detail/post-box/comment-box/comment-box.component';
import {HolidayCreateComponent} from './holiday-create/holiday-create.component';
import {HolidayOverviewComponent} from './holiday-overview/holiday-overview.component';
import {HolidayService} from './holiday.service';


@NgModule({
  declarations: [
    HolidayDetailComponent,
    ParticipantsComponent,
    PostBoxComponent,
    HolidayOverviewComponent,
    HolidayCreateComponent,
    CommentBoxComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatListModule,
  ],
  providers: [HolidayService]
})
export class HolidayModule {
}
