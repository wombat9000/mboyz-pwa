import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import * as holidayActions from '../actions/holiday.actions';
import {Action} from '@ngrx/store';
import {HolidayFirestore} from '../services/holiday-firestore.service';
import {map, mergeMap, switchMap} from 'rxjs/operators';


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
      ofType(holidayActions.QUERY),
      switchMap(() => this.holidayFS.observeChanges()),
      map(action => {
        return {
          type: `[Holiday Firestore] ${action.type}`,
          holiday: {id: action.payload.doc.id, ...action.payload.doc.data()}
        };
      })
    );


  constructor(private actions$: Actions, private holidayFS: HolidayFirestore) {
  }
}
