import * as dataActions from '../actions/data.actions';
import {map} from 'rxjs/operators';
import {FirestoreService} from '../../holiday/services/firestore.service';
import {Observable} from 'rxjs/index';
import {Action} from '@ngrx/store';
import {Type} from '@angular/core';
import {filter} from 'rxjs/operators';
import {Actions, Effect} from '@ngrx/effects';

export abstract class DataEffects {

  abstract readonly createActionType: string;
  abstract readonly createSuccessAction: Type<Action>;

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    filter((it) => this.createActionType === it.type),
    map((it: dataActions.CreateAction) => this.firestoreService.save('comments', it.payload.record)),
    map(() => new this.createSuccessAction())
  );

  protected constructor(protected actions$: Actions, protected firestoreService: FirestoreService) {
  }
}
