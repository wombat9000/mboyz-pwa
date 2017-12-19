import {NgModule} from '@angular/core';

import {
  MatButtonModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatListModule,
  MatMenuModule, MatNativeDateModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageBoxComponent} from './message-box/message-box.component';
import {HolidayDetailComponent} from './holiday-detail.component';
import {ParticipantsComponent} from './participants/participants.component';


@NgModule({
  declarations: [
    HolidayDetailComponent,
    ParticipantsComponent,
    MessageBoxComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatListModule,
    MatToolbarModule,
  ]
})
export class HolidayDetailModule {
}
