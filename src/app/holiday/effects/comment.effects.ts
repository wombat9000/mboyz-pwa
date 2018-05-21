import {Injectable, Type} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as holidayActions from '../actions/holiday.actions';
import {HolidayActions, QueryStopped} from '../actions/holiday.actions';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {asComment} from '../models/comment';
import {map, switchMap} from 'rxjs/operators';
import {FirestoreService} from '../services/firestore.service';
import {DataEffects} from '../../core/effects/data.effects';
import {CREATE, CreateSuccess} from '../actions/comment.actions';


@Injectable()
export class CommentEffects extends DataEffects {

  readonly createActionType: string = CREATE;
  readonly createSuccessAction: Type<Action> = CreateSuccess;
  readonly collection: string = 'comments';

  constructor(actions$: Actions, firestoreService: FirestoreService) {
    super(actions$, firestoreService);
  }

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
          type: `[comments Firestore] ${action.type}`,
          payload: {record: comment}
        };
      })
    );
  }
}
