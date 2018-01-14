import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as actions from '../actions/holiday.actions';
import * as fromHoliday from '../reducers/holiday.reducer';
import {Holiday} from '../model/holiday';
import * as moment from 'moment';

@Component({
  selector: 'app-holiday-overview',
  templateUrl: './holiday-overview.component.html',
  styleUrls: ['./holiday-overview.component.scss']
})
export class HolidayOverviewComponent implements OnInit {

  holidays$: Observable<Holiday[]>;

  constructor(private store: Store<fromHoliday.State>,
              private router: Router) {
  }

  ngOnInit() {
    this.holidays$ = this.store.select(fromHoliday.selectAll)
      .map(this.sortByDate);

    this.store.dispatch(new actions.Query());
  }

  gotoCreate() {
    return this.router.navigateByUrl('/holiday/create');
  }

  goToDetail(holidayId: string) {
    return this.router.navigateByUrl(`/holiday/${holidayId}`);
  }

  private sortByDate(holidays: Holiday[]) {
    return holidays.sort((some, other) => {
      return moment(some.created).isAfter(moment(other.created)) ? 0 : 1;
    });
  }
}
