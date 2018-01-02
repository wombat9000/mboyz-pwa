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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {LoginComponent} from './login/login.component';
import {AuthService} from './core/auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {TopBarComponent} from './top-bar/top-bar.component';
import {UserMenuComponent} from './top-bar/user-menu/user-menu.component';
import {BgImageDirective} from './top-bar/user-menu/bg-image.directive';
import {HolidayModule} from './holiday/holiday.module';
import {UserFirestore} from './core/user-firestore.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopBarComponent,
    UserMenuComponent,
    BgImageDirective,
  ],
  // TODO: extract modules
  imports: [
    HolidayModule,
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
  providers: [AuthService, UserFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {
}
