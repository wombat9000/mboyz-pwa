import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import * as holidayActions from '../actions/holiday.actions';
import {HolidayActions, QueryStopped} from '../actions/holiday.actions';
import {Action} from '@ngrx/store';
import {HolidayFirestore} from '../services/holiday-firestore.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class HolidayEffects {

  @Effect({dispatch: false})
  create$: Observable<void> = this.actions$
    .ofType(holidayActions.CREATE)
    .switchMap((action: holidayActions.Create) => {
      return this.holidayFS.save(action.holiday);
    });

  @Effect()
  query$: Observable<Action> = this.actions$
    .pipe(
      ofType(holidayActions.QUERY, holidayActions.QUERY_STOP),
      switchMap((action: HolidayActions) => {
        if (action.type === holidayActions.QUERY) {
          return this.consumeUpdates();
        } else {
          return of(new QueryStopped());
        }
      })
    );

  constructor(private actions$: Actions, private holidayFS: HolidayFirestore) {
  }

  private consumeUpdates(): Observable<Action> {
    return this.holidayFS.observeChanges()
      .map(action => {
        return {
          type: `[Holiday Firestore] ${action.type}`,
          holiday: {id: action.payload.doc.id, ...action.payload.doc.data()}
        };
      });
  }
}
