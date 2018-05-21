import {Injectable, Type} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {CREATE, CreateSuccess} from '../actions/post.actions';
import {Action} from '@ngrx/store';
import {Post} from '../models/post';
import {FirestoreService} from '../services/firestore.service';
import {DataEffects} from '../../core/effects/data.effects';

@Injectable()
export class PostEffects extends DataEffects<Post> {

  protected collection = 'posts';
  protected createActionType = CREATE;
  protected createSuccessAction: Type<Action> = CreateSuccess;

  constructor(actions$: Actions, firestoreService: FirestoreService) {
    super(actions$, firestoreService);
  }
}
