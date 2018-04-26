import {AppComponent} from './containers/app.component';
import {BgImageDirective} from './components/user-menu/bg-image.directive';
import {NgModule} from '@angular/core';
import {UserMenuComponent} from './components/user-menu/user-menu.component';
import {TopBarComponent} from './containers/top-bar/top-bar.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material';

export const COMPONENTS = [
  AppComponent,
  TopBarComponent,
  UserMenuComponent,
  BgImageDirective,
];

@NgModule({
  imports: [RouterModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
    };
  }
}
