import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as commentActions from '../actions/comment.actions';
import * as holidayActions from '../actions/holiday.actions';
import {HolidayActions, QueryStopped} from '../actions/holiday.actions';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {asComment} from '../models/comment';
import {map, switchMap} from 'rxjs/operators';
import {FirestoreService} from '../services/firestore.service';
import {PersistRecord} from '../../core/actions/firestore.actions';


@Injectable()
export class CommentEffects {

  @Effect()
  create$: Observable<PersistRecord> = this.actions$.pipe(
    ofType(commentActions.CREATE),
    map((it: commentActions.Create) => {
      return new PersistRecord({docPath: 'comments', record: it.payload.comment});
    }),
  );

  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType(holidayActions.QUERY, holidayActions.QUERY_STOP),
    switchMap((action: HolidayActions) => {
      if (action.type === holidayActions.QUERY) {
        return this.getObservable();
      } else {
        return of(new QueryStopped());
      }
    }),
  );

  constructor(private actions$: Actions, private firestoreService: FirestoreService) {
  }

  private getObservable(): Observable<Action> {
    return this.firestoreService.observeUpdates<Comment>('comments').pipe(
      map(action => {
        const comment = asComment(action.payload.doc.data());
        return {
          type: `[comments Firestore] ${action.type}`,
          payload: {comment: comment}
        };
      }));
  }
}
