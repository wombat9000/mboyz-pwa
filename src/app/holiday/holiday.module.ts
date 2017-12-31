import {NgModule} from '@angular/core';

import {
  MatButtonModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatNativeDateModule, MatTabsModule
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
import {HolidayFirestore} from './holiday-firestore.service';
import {PostFirestore} from './post-firestore.service';
import {PostComponent} from './holiday-detail/post-box/post/post.component';


@NgModule({
  declarations: [
    HolidayOverviewComponent,
    HolidayCreateComponent,
    HolidayDetailComponent,
    PostBoxComponent,
    CommentBoxComponent,
    ParticipantsComponent,
    PostComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatIconModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatListModule,
  ],
  providers: [
    HolidayService,
    HolidayFirestore,
    PostFirestore]
})
export class HolidayModule {
}
