import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import * as holidayActions from '../actions/holiday.actions';
import {HolidayActions, QueryStopped} from '../actions/holiday.actions';
import {Action} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import {Holiday} from '../models/holiday';
import {FirestoreService} from '../services/firestore.service';

@Injectable()
export class HolidayEffects {

  @Effect({dispatch: false})
  create$: Observable<void> = this.actions$.pipe(
    ofType(holidayActions.CREATE),
    switchMap((action: holidayActions.Create) => {
      return this.firestore.save('holidays', action.holiday);
    }));

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

  constructor(private actions$: Actions, private firestore: FirestoreService) {
  }

  private consumeUpdates(): Observable<Action> {
    return this.firestore.observeUpdates<Holiday>('holidays').pipe(
      map(action => {
        return {
          type: `[Holiday Firestore] ${action.type}`,
          holiday: {id: action.payload.doc.id, ...action.payload.doc.data()}
        };
      }));
  }
}
