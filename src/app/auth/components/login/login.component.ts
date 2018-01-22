import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../../reducers/auth.reducer';
import {FbLogin} from '../../actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private store: Store<fromAuth.State>) {
  }

  fbLogin() {
    this.store.dispatch(new FbLogin());
  }
}
