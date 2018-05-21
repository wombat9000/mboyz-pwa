import {Injectable, Type} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Holiday} from '../models/holiday';
import {FirestoreService} from '../services/firestore.service';
import {DataEffects} from '../../core/effects/data.effects';
import {CREATE, CreateSuccess} from '../actions/holiday.actions';
import {Action} from '@ngrx/store';

@Injectable()
export class HolidayEffects extends DataEffects<Holiday> {

  protected collection = 'holidays';
  protected createActionType = CREATE;
  protected createSuccessAction: Type<Action> = CreateSuccess;

  constructor(actions$: Actions, firestoreService: FirestoreService) {
    super(actions$, firestoreService);
  }
}
