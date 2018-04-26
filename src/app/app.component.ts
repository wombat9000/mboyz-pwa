import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {environment} from '../environments/environment';
import * as holidayActions from './holiday/actions/holiday.actions';
import * as postActions from './holiday/actions/post.actions';
import * as fromRoot from './reducers';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .env-info {
      position: fixed;
      bottom: 0;
      left: 0;
    }
  `]
})
export class AppComponent implements OnInit {
  isStaging = environment.name === 'staging';

  constructor(private store: Store<fromRoot.State>) {
    moment.locale('de');
  }

  ngOnInit() {
    console.log('Application starting up, querying for data.');
    this.store.dispatch(new holidayActions.Query());
    this.store.dispatch(new postActions.Query());
  }
}
