import * as firestoreActions from '../actions/firestore.actions';
import {map} from 'rxjs/operators';
import {FirestoreService} from '../../holiday/services/firestore.service';
import {Observable} from 'rxjs/index';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';

@Injectable()
export class FirestoreEffects {

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(firestoreActions.CREATE_RECORD),
    map((it: firestoreActions.CreateRecord) => {
      this.firestoreService.save(it.payload.collection, it.payload.record);
      return {
        type: `[${it.payload.collection} ${it.origin}] create`,
        payload: {record: it.payload.record}
      };
    }),
  );

  constructor(private actions$: Actions, private firestoreService: FirestoreService) {
  }
}
