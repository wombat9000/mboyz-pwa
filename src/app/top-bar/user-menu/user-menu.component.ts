import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers';
import {Logout} from '../../auth/actions/auth.actions';
import {MtravelUser} from '../../auth/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {

  @Input()
  user: MtravelUser;

  constructor(private store: Store<fromAuth.State>) {
  }

  signOut() {
    this.store.dispatch(new Logout());
  }
}
