import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PostBoxComponent} from './holiday-detail/post-box/post-box.component';
import {HolidayDetailComponent} from './holiday-detail/holiday-detail.component';
import {CommentBoxComponent} from './holiday-detail/post-box/post/comment-box/comment-box.component';
import {HolidayCreateComponent} from './holiday-create/holiday-create.component';
import {HolidayOverviewComponent} from './holiday-overview/holiday-overview.component';
import {HolidayService} from './services/holiday.service';
import {HolidayFirestore} from './services/holiday-firestore.service';
import {PostFirestore} from './services/post-firestore.service';
import {PostComponent} from './holiday-detail/post-box/post/post.component';
import {CommentComponent} from './holiday-detail/post-box/post/comment-box/comment/comment.component';
import {CommentFirestore} from './services/comment-firestore.service';
import {StoreModule} from '@ngrx/store';
import {reducer} from './reducers/holiday.reducer';
import {EffectsModule} from '@ngrx/effects';
import {HolidayEffects} from './effects/holiday.effects';
import {HolidayRoutingModule} from './holiday-routing.module';
import {MaterialModule} from '../material';


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
    MaterialModule,
    HolidayRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
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
