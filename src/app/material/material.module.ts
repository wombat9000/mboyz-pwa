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
import {MatMomentDateModule} from '@angular/material-moment-adapter';


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
  MatMomentDateModule,
  MatButtonModule];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})
export class MaterialModule {
}
