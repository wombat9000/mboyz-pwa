import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import * as holidayActions from '../actions/holiday.actions';
import {HolidayService} from '../services/holiday.service';
import {Action} from '@ngrx/store';


@Injectable()
export class HolidayEffects {

  @Effect({dispatch: false})
  create$: Observable<void> = this.actions$
    .ofType(holidayActions.CREATE)
    .switchMap((action: holidayActions.Create) => {
      return this.holidayService.create(action.holiday);
    });

  @Effect()
  query$: Observable<Action> = this.actions$.ofType(holidayActions.QUERY)
    .switchMap(() => this.holidayService.changesToCollection())
    .mergeMap(action => action)
    .map(action => {
      return {
        type: `[Holiday] ${action.type}`,
        holiday: {id: action.payload.doc.id, ...action.payload.doc.data()}
      };
    });

  constructor(private actions$: Actions, private holidayService: HolidayService) {
  }
}
