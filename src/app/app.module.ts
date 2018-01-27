import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {TopBarComponent} from './top-bar/top-bar.component';
import {UserMenuComponent} from './top-bar/user-menu/user-menu.component';
import {BgImageDirective} from './top-bar/user-menu/bg-image.directive';
import {HolidayModule} from './holiday/holiday.module';
import {StoreModule} from '@ngrx/store';
import {reducers} from './holiday/reducers';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {BrowserModule} from '@angular/platform-browser';
import {AuthModule} from './auth/auth.module';
import {MaterialModule} from './material';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    UserMenuComponent,
    BgImageDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HolidayModule,
    AuthModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({maxAge: 10}),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    // environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    AngularFireModule.initializeApp(environment.firebase)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
