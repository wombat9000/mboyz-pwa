import {Injectable, Type} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {MbComment} from '../models/comment';
import {FirestoreService} from '../services/firestore.service';
import {DataEffects} from '../../core/effects/data.effects';
import {CREATE, CreateSuccess} from '../actions/comment.actions';


@Injectable()
export class CommentEffects extends DataEffects<MbComment> {

  readonly collection: string = 'comments';
  readonly createActionType: string = CREATE;
  readonly createSuccessAction: Type<Action> = CreateSuccess;

  constructor(actions$: Actions, firestoreService: FirestoreService) {
    super(actions$, firestoreService);
  }
}
