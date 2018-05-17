import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromHoliday from '../../reducers/holiday.reducer';
import * as actions from '../../actions/holiday.actions';
import {Holiday} from '../../models/holiday';
import * as moment from 'moment';
import * as uuid from 'uuid';
import {SetTitle} from '../../../core/actions/app-bar.actions';


@Component({
  selector: 'app-holiday-create',
  template: `
    <h2>Neuen Urlaub vorschlagen:</h2>

    <form class="holiday-form"
          (ngSubmit)="onSubmit()"
          #holidayForm="ngForm">
      <mat-form-field>
        <input matInput
               [(ngModel)]="holidayName"
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
export class CreateHolidayPageComponent implements OnInit {


  holidayName = '';

  constructor(private store: Store<fromHoliday.State>,
              private router: Router) {
  }

  ngOnInit(): void {
    // TODO: test
    this.store.dispatch(new SetTitle({newTitle: 'create new'}));
  }

  onSubmit() {
    const newHoliday: Holiday = {
      id: uuid(),
      name: this.holidayName,
      created: moment().toISOString()
    };

    this.store.dispatch(new actions.Create(newHoliday));
    this.router.navigate(['/']);
  }
}
