import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import * as holidayActions from '../actions/holiday.actions';
import {Create} from '../actions/holiday.actions';
import {HolidayService} from '../holiday.service';


@Injectable()
export class HolidayEffects {

  @Effect({dispatch: false})
  create$: Observable<void> = this.actions$
    .ofType(holidayActions.CREATE)
    .switchMap((action) => {
      return this.holidayService.create((action as Create).holiday);
    });

  constructor(private actions$: Actions, private holidayService: HolidayService) {
  }
}
