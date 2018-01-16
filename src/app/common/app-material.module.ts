import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule,
  MatNativeDateModule,
  MatTabsModule, MatToolbarModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  imports: [
    BrowserModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule],
  exports: [
    BrowserModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class AppMaterialModule {
}
