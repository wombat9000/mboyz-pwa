import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {
  MatButtonModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatListModule,
  MatNativeDateModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {environment} from '../environments/environment';
import {HolidayDetailComponent} from './holiday-detail/holiday-detail.component';
import {ParticipantsComponent} from './holiday-detail/participants/participants.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HolidayDetailComponent,
    ParticipantsComponent
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
