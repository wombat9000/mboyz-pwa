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
    ofType(firestoreActions.PERSIST_RECORD),
    map((it: firestoreActions.PersistRecord) => this.firestoreService.save(it.payload.docPath, it.payload.record)),
    map(() => new firestoreActions.PersistSuccess())
  );

  constructor(private actions$: Actions, private firestoreService: FirestoreService) {
  }
}
