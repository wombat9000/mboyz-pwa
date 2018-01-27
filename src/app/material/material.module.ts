import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule, MatProgressSpinnerModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';


const COMPONENTS = [
  MatButtonModule,
  MatProgressSpinnerModule,
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
  MatButtonModule];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})
export class MaterialModule {
}
