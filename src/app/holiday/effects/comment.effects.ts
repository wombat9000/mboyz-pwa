import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as commentActions from '../actions/comment.actions';
import * as holidayActions from '../actions/holiday.actions';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {CommentFirestore} from '../services/comment-firestore.service';
import {asComment} from '../models/comment';
import {map, switchMap} from 'rxjs/operators';


@Injectable()
export class CommentEffects {

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(commentActions.CREATE),
    map((it: commentActions.Create) => this.commentFirestore.save(it.payload.comment)),
    map(() => new commentActions.CreateSuccess()),
  );

  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType(holidayActions.QUERY),
    switchMap(() => this.commentFirestore.observeChangesFrom('comments')),
    map(action => {
      const comment = asComment(action.payload.doc.data());
      return {
        type: `[Comment Firestore] ${action.type}`,
        payload: {comment: comment}
      };
    })
);

  constructor(private actions$: Actions, private commentFirestore: CommentFirestore) {
  }
}
