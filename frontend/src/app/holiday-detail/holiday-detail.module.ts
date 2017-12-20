import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatListModule, MatNativeDateModule,
  MatTabsModule
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
    MatDatepickerModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatListModule,
  ]
})
export class HolidayDetailModule {
}
