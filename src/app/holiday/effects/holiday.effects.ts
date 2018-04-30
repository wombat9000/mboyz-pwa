import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import * as holidayActions from '../actions/holiday.actions';
import {Action} from '@ngrx/store';
import {HolidayFirestore} from '../services/holiday-firestore.service';


@Injectable()
export class HolidayEffects {

  @Effect({dispatch: false})
  create$: Observable<void> = this.actions$
    .ofType(holidayActions.CREATE)
    .switchMap((action: holidayActions.Create) => {
      return this.holidayFS.save(action.holiday);
    });

  @Effect()
  query$: Observable<Action> = this.actions$.ofType(holidayActions.QUERY)
    .switchMap(() => this.holidayFS.observeChanges())
    .mergeMap(action => action)
    .map(action => {
      return {
        type: `[Holiday Firestore] ${action.type}`,
        holiday: {id: action.payload.doc.id, ...action.payload.doc.data()}
      };
    });

  constructor(private actions$: Actions, private holidayFS: HolidayFirestore) {
  }
}
