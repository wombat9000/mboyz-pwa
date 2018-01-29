import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import {FacebookLogin} from '../../actions/auth.actions';
import * as fromAuth from '../../reducers';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  pending$: Observable<boolean> = this.store.select(fromAuth.getLoginPagePending);
  error$: Observable<string> = this.store.select(fromAuth.getErrorMessage);

  constructor(private store: Store<fromAuth.State>) {
  }

  fbLogin() {
    this.store.dispatch(new FacebookLogin());
  }
}
