import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatToolbarModule
} from '@angular/material';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HolidayDetailModule} from './holiday-detail/holiday-detail.module';
import {HolidayOverviewComponent} from './holiday-overview/holiday-overview.component';
import {HolidayCreateComponent} from './holiday-create/holiday-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HolidayService} from './holiday.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {LoginComponent} from './login/login.component';
import {AuthService} from './auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {UserRepository} from './user-repository.service';


@NgModule({
  declarations: [
    AppComponent,
    HolidayOverviewComponent,
    HolidayCreateComponent,
    LoginComponent,
  ],
  // TODO: extract modules
  imports: [
    HolidayDetailModule,
    MatIconModule,
    MatChipsModule,
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
    AngularFirestoreModule,
    AngularFireAuthModule,
    environment.production ? AngularFireModule.initializeApp(environment.firebase) : [],
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [HolidayService, AuthService, UserRepository],
  bootstrap: [AppComponent]
})
export class AppModule {
}
