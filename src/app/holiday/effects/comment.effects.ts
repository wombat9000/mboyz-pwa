import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as commentActions from '../actions/comment.actions';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {CommentFirestore} from '../services/comment-firestore.service';
import {asComment} from '../models/comment';


@Injectable()
export class CommentEffects {

  @Effect()
  create$: Observable<Action> = this.actions$.ofType(commentActions.CREATE)
    .map((it: commentActions.Create) => this.commentFirestore.save(it.payload.comment))
    .do(() => console.log('[CommentFX] create success!'))
    .map(() => new commentActions.CreateSuccess());

  @Effect()
  query$: Observable<Action> = this.actions$.ofType(commentActions.QUERY)
    .switchMap(() => this.commentFirestore.observeChangesFrom('comments'))
    .map(action => {
      const comment = asComment(action.payload.doc.data());
      return {
        type: `[Comment] ${action.type}`,
        payload: {comment: comment}
      };
    });

  constructor(private actions$: Actions, private commentFirestore: CommentFirestore) {
  }
}
