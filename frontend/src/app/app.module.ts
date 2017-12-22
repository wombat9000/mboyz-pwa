import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HolidayDetailModule} from './holiday-detail/holiday-detail.module';
import {HolidayOverviewComponent} from './holiday-overview/holiday-overview.component';
import {HolidayCreateComponent} from './holiday-create/holiday-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HolidayService} from './holiday.service';


@NgModule({
  declarations: [
    AppComponent,
    HolidayOverviewComponent,
    HolidayCreateComponent,
  ],
  imports: [
    HolidayDetailModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [HolidayService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
