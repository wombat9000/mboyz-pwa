import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {
  MatButtonModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatListModule,
  MatMenuModule, MatNativeDateModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import {environment} from '../environments/environment';
import {HolidayDetailComponent} from './holiday-detail/holiday-detail.component';
import {ParticipantsComponent} from './holiday-detail/participants/participants.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageBoxComponent} from './holiday-detail/message-box/message-box.component';
import {HolidayDetailModule} from './holiday-detail/holiday-detail.module';


@NgModule({
  declarations: [
    AppComponent,
    HolidayDetailComponent,
    ParticipantsComponent,
    MessageBoxComponent
  ],
  imports: [
    HolidayDetailModule,
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
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
