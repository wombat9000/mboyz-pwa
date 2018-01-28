import {Component} from '@angular/core';
import * as moment from 'moment';
import {environment} from '../environments/environment';
import {Store} from '@ngrx/store';
import * as fromAuth from './auth/reducers';
import {GetUser} from './auth/actions/auth.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isStaging = environment.name === 'staging';

  constructor(private store: Store<fromAuth.State>) {
    store.dispatch(new GetUser());
    moment.locale('de');
  }
}
