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
  template: `
    <h2>Neuen Urlaub vorschlagen:</h2>

    <form class="holiday-form"
          (ngSubmit)="onSubmit()"
          #holidayForm="ngForm">
      <mat-form-field>
        <input matInput
               [(ngModel)]="holidayFormModel.name"
               name="name"
               required
               placeholder="Name">
      </mat-form-field>

      <p>
        <button mat-raised-button
                color="accent"
                type="submit"
                name="submit">
          Urlaub Erstellen
        </button>
      </p>
      <div>
        <span>Jede Person mit der URL hat Zugang zur Urlaubsplanung und kann diese bearbeiten.</span>
      </div>
    </form>
  `,
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
