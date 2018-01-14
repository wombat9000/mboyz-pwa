import {Component} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromHoliday from '../reducers/holiday.reducer';
import * as actions from '../actions/holiday.actions';
import {Holiday} from '../model/holiday';


class HolidayFormModel {
  constructor(public name: string) {
  }

  asHoliday(): Holiday {
    return {id: uuid(), name: this.name};
  }
}

@Component({
  selector: 'app-holiday-create',
  templateUrl: './holiday-create.component.html',
  styleUrls: ['./holiday-create.component.scss']
})
export class HolidayCreateComponent {

  holiday = new HolidayFormModel('');

  constructor(private store: Store<fromHoliday.State>,
              private router: Router) {
  }

  onSubmit() {
    this.store.dispatch(new actions.Create(this.holiday.asHoliday()));
    this.router.navigate(['/']);
  }
}
