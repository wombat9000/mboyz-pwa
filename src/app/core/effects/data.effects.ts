import * as dataActions from '../actions/data.actions';
import {DataActions, QUERY, QUERY_STOP, QueryStopped} from '../actions/data.actions';
import {filter, map, switchMap} from 'rxjs/operators';
import {FirestoreService} from '../../holiday/services/firestore.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {Type} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {DbRecord} from '../../holiday/models/DbRecord';
import {DocumentChangeAction} from 'angularfire2/firestore';

export abstract class DataEffects<T extends DbRecord> {

  protected abstract collection: string;
  protected abstract createActionType: string;
  protected abstract createSuccessAction: Type<Action>;

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    filter((it) => this.createActionType === it.type),
    map((it: dataActions.CreateAction) => this.firestoreService.save(this.collection, it.payload.record)),
    map(() => new this.createSuccessAction())
  );

  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType(QUERY, QUERY_STOP),
    switchMap((action: DataActions) => {
      if (action.type === QUERY) {
        return this.observeUpdates();
      } else {
        return of(new QueryStopped());
      }
    })
  );

  protected constructor(protected actions$: Actions, protected firestoreService: FirestoreService) {
  }

  private observeUpdates(): Observable<Action> {
    return this.firestoreService.observeUpdates<T>(this.collection).pipe(
      map<DocumentChangeAction<T>, Action>((action: DocumentChangeAction<T>) => {
        const record: T = action.payload.doc.data();
        return {
          type: `[${this.collection} Firestore] ${action.type}`,
          payload: {record: record}
        };
      })
    );
  }
}
