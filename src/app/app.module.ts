import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HolidayDetailModule} from './holiday-detail/holiday-detail.module';
import {HolidayOverviewComponent} from './holiday-overview/holiday-overview.component';
import {HolidayCreateComponent} from './holiday-create/holiday-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HolidayService} from './holiday.service';
import {AngularFireModule} from 'angularfire2';

@NgModule({
  declarations: [
    AppComponent,
    HolidayOverviewComponent,
    HolidayCreateComponent,
  ],
  imports: [
    HolidayDetailModule,
    MatIconModule,
    MatListModule,
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
    environment.production ? AngularFireModule.initializeApp(environment.firebase) : [],
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [HolidayService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
