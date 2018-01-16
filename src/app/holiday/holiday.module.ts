import {NgModule} from '@angular/core';

import {
  MatButtonModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatNativeDateModule, MatTabsModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PostBoxComponent} from './holiday-detail/post-box/post-box.component';
import {HolidayDetailComponent} from './holiday-detail/holiday-detail.component';
import {CommentBoxComponent} from './holiday-detail/post-box/post/comment-box/comment-box.component';
import {HolidayCreateComponent} from './holiday-create/holiday-create.component';
import {HolidayOverviewComponent} from './holiday-overview/holiday-overview.component';
import {HolidayService} from './holiday.service';
import {HolidayFirestore} from './holiday-firestore.service';
import {PostFirestore} from './post-firestore.service';
import {PostComponent} from './holiday-detail/post-box/post/post.component';
import {CommentComponent} from './holiday-detail/post-box/post/comment-box/comment/comment.component';
import {CommentFirestore} from './holiday-detail/post-box/post/comment-box/comment-firestore.service';
import {StoreModule} from '@ngrx/store';
import {reducer} from './reducers/holiday.reducer';
import {EffectsModule} from '@ngrx/effects';
import {HolidayEffects} from './effects/holiday.effects';
import {HolidayRoutingModule} from './holiday-routing.module';


@NgModule({
  declarations: [
    HolidayOverviewComponent,
    HolidayCreateComponent,
    HolidayDetailComponent,
    PostBoxComponent,
    PostComponent,
    CommentBoxComponent,
    CommentComponent
  ],
  imports: [
    HolidayRoutingModule,
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
    StoreModule.forFeature('holiday', reducer),
    EffectsModule.forFeature([HolidayEffects])
  ],
  providers: [
    HolidayService,
    HolidayFirestore,
    PostFirestore,
    CommentFirestore]
})
export class HolidayModule {
}
