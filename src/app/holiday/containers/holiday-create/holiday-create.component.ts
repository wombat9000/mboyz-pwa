import {Component} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromHoliday from '../../reducers/holiday.reducer';
import * as actions from '../../actions/holiday.actions';
import {Holiday} from '../../model/holiday';
import * as moment from 'moment';


@Component({
  selector: 'app-holiday-create',
  templateUrl: './holiday-create.component.html',
  styleUrls: ['./holiday-create.component.scss']
})
export class CreateHolidayPageComponent {

  holidayFormModel: Holiday = {
    id: uuid(),
    name: '',
    created: moment().toISOString()
  };

  constructor(private store: Store<fromHoliday.State>,
              private router: Router) {
  }

  onSubmit() {
    this.store.dispatch(new actions.Create(this.holidayFormModel));
    this.router.navigate(['/']);
  }
}
