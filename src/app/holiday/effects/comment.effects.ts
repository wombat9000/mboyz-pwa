import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as commentActions from '../actions/comment.actions';
import * as holidayActions from '../actions/holiday.actions';
import {HolidayActions} from '../actions/holiday.actions';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {asComment} from '../models/comment';
import {map, switchMap} from 'rxjs/operators';
import {QueryStopped} from '../actions/holiday.actions';
import {FirestoreService} from '../services/firestore.service';


@Injectable()
export class CommentEffects {

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(commentActions.CREATE),
    map((it: commentActions.Create) => this.firestoreService.save('comments', it.payload.comment)),
    map(() => new commentActions.CreateSuccess()),
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

  private getObservable(): Observable<Action> {
    return this.firestoreService.observeUpdates<Comment>('comments').pipe(
      map(action => {
        const comment = asComment(action.payload.doc.data());
        return {
          type: `[Comment Firestore] ${action.type}`,
          payload: {comment: comment}
        };
      }));
  }

  constructor(private actions$: Actions, private firestoreService: FirestoreService) {
  }
}
