import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateHolidayPageComponent} from './containers/holiday-create/holiday-create.component';
import {HolidayOverviewPageComponent} from './containers/holiday-overview/holiday-overview.component';
import {HolidayService} from './services/holiday.service';
import {HolidayFirestore} from './services/holiday-firestore.service';
import {PostFirestore} from './services/post-firestore.service';
import {CommentFirestore} from './services/comment-firestore.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';

import {EffectsModule} from '@ngrx/effects';
import {HolidayEffects} from './effects/holiday.effects';
import {HolidayRoutingModule} from './holiday-routing.module';
import {MaterialModule} from '../material';
import {CommentBoxComponent} from './containers/comment-box/comment-box.component';
import {HolidayDetailPageComponent} from './containers/holiday-detail/holiday-detail.component';
import {PostBoxComponent} from './containers/post-box/post-box.component';
import {PostComponent} from './components/post/post.component';
import {CommentComponent} from './components/comment/comment.component';
import {CommentFieldComponent} from './components/comment-field/comment-field.component';
import {PostEffects} from './effects/post.effects';
import {CommentEffects} from './effects/comment.effects';


@NgModule({
  declarations: [
    HolidayOverviewPageComponent,
    CreateHolidayPageComponent,
    HolidayDetailPageComponent,
    PostBoxComponent,
    PostComponent,
    CommentBoxComponent,
    CommentComponent,
    CommentFieldComponent
  ],
  imports: [
    MaterialModule,
    HolidayRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('holidayPlanner', reducers),
    EffectsModule.forFeature([HolidayEffects, PostEffects, CommentEffects])
  ],
  providers: [
    HolidayService,
    HolidayFirestore,
    PostFirestore,
    CommentFirestore
  ]
})
export class HolidayModule {
}
