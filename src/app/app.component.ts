import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {environment} from '../environments/environment';
import * as actions from './holiday/actions/holiday.actions';
import * as fromHoliday from './holiday/reducers';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isStaging = environment.name === 'staging';

  constructor(private store: Store<fromHoliday.State>) {
    moment.locale('de');
  }

  ngOnInit() {
    this.store.dispatch(new actions.Query());
  }
}
