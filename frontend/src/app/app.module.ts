import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MatButtonModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HolidayDetailModule} from './holiday-detail/holiday-detail.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HolidayDetailModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
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
