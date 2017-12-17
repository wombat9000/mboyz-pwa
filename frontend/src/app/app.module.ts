import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MatListModule, MatTabsModule, MatToolbarModule} from '@angular/material';
import {environment} from '../environments/environment';
import {HolidayDetailComponent} from './holiday-detail/holiday-detail.component';
import {ParticipantsComponent} from './holiday-detail/participants/participants.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HolidayDetailComponent,
    ParticipantsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatTabsModule,
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
