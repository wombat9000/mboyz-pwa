import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateHolidayPageComponent} from './containers/holiday-create/holiday-create.component';
import {HolidayOverviewPageComponent} from './containers/holiday-overview/holiday-overview.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';

import {EffectsModule} from '@ngrx/effects';
import {HolidayEffects} from './effects/holiday.effects';
import {HolidayRoutingModule} from './holiday-routing.module';
import {MaterialModule} from '../material';
import {CommentBoxComponent} from './components/comment-box/comment-box.component';
import {HolidayDetailPageComponent} from './containers/holiday-detail/holiday-detail.component';
import {ForumComponent} from './containers/forum/forum.component';
import {PostComponent} from './components/post/post.component';
import {CommentComponent} from './components/comment/comment.component';
import {CommentFieldComponent} from './components/comment-field/comment-field.component';
import {PostEffects} from './effects/post.effects';
import {CommentEffects} from './effects/comment.effects';
import {FirestoreService} from './services/firestore.service';
import {UserEffects} from './effects/user.effects';
import {SelectedHolidayPageComponent} from './containers/selected-holiday-page/selected-holiday-page.component';
import {DateSuggestComponent} from './containers/date-suggest/date-suggest.component';
import {DatePlannerComponent} from './containers/date-planner/date-planner.component';


const EFFECTS = [
  HolidayEffects,
  UserEffects,
  PostEffects,
  CommentEffects
];

@NgModule({
  declarations: [
    HolidayOverviewPageComponent,
    CreateHolidayPageComponent,
    HolidayDetailPageComponent,
    ForumComponent,
    PostComponent,
    CommentBoxComponent,
    CommentComponent,
    CommentFieldComponent,
    SelectedHolidayPageComponent,
    DateSuggestComponent,
    DatePlannerComponent,
  ],
  imports: [
    MaterialModule,
    HolidayRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('holidayPlanner', reducers),
    EffectsModule.forFeature(EFFECTS)
  ],
  providers: [
    FirestoreService
  ]
})
export class HolidayModule {
}
