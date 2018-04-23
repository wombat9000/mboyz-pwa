import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as postActions from '../actions/post.actions';
import {Create, CreateSuccess} from '../actions/post.actions';
import {PostFirestore} from '../services/post-firestore.service';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Post} from '../models/post';


@Injectable()
export class PostEffects {

  @Effect()
  create$: Observable<Action> = this.actions$.ofType(postActions.CREATE)
    .map((it: Create) => this.postFirestore.save(it.payload.post))
    .map(() => new CreateSuccess());

  @Effect()
  query$: Observable<Action> = this.actions$.ofType(postActions.QUERY)
    .switchMap(() => this.postFirestore.observeChanges())
    .map(action => {
      const data = action.payload.doc.data();
      const post: Post = {
        id: data.id,
        text: data.text,
        authorId: data.authorId,
        holidayId: data.holidayId,
        created: data.created
      };

      return {
        type: `[Post] ${action.type}`,
        payload: {post: post}
      };
    });

  constructor(private actions$: Actions, private postFirestore: PostFirestore) {
  }
}
