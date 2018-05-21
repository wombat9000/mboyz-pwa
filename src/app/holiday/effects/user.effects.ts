import {Injectable, Type} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {CREATE, CreateSuccess} from '../actions/user.actions';
import {Action} from '@ngrx/store';
import {FirestoreService} from '../services/firestore.service';
import {DataEffects} from '../../core/effects/data.effects';
import {MtravelUser} from '../../auth/services/auth.service';

@Injectable()
export class UserEffects extends DataEffects<MtravelUser> {

  protected collection = 'users';
  protected createActionType = CREATE;
  protected createSuccessAction: Type<Action> = CreateSuccess;

  constructor(actions$: Actions, firestoreService: FirestoreService) {
    super(actions$, firestoreService);
  }
}
