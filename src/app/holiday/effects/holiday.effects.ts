import {Injectable, Type} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Holiday} from '../models/holiday';
import {FirestoreService} from '../services/firestore.service';
import {DataEffects} from '../../core/effects/data.effects';
import {CREATE, Create} from '../actions/holiday.actions';

@Injectable()
export class HolidayEffects extends DataEffects<Holiday> {

  createSuccessAction: Type<Action> = Create;
  createActionType = CREATE;
  collection = 'holidays';

  constructor(actions$: Actions, firestore: FirestoreService) {
    super(actions$, firestore);
  }
}
