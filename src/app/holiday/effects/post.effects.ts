import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as postActions from '../actions/post.actions';
import {Create, CreateSuccess} from '../actions/post.actions';
import {PostFirestore} from '../services/post-firestore.service';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Post} from '../models/post';
import {map, switchMap} from 'rxjs/operators';
import * as holidayActions from '../actions/holiday.actions';
import {HolidayActions, QueryStopped} from '../actions/holiday.actions';


@Injectable()
export class PostEffects {

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(postActions.CREATE),
    map((it: Create) => this.postFirestore.save(it.payload.post)),
    map(() => new CreateSuccess())
  );

  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType(holidayActions.QUERY, holidayActions.QUERY_STOP),
    switchMap((action: HolidayActions) => {
      if (action.type === holidayActions.QUERY) {
        return this.getObservable();
      } else {
        return of(new QueryStopped());
      }
    }),
  );

  constructor(private actions$: Actions, private postFirestore: PostFirestore) {
  }

  private getObservable(): Observable<Action> {
    return this.postFirestore.observeChanges().pipe(
      map(action => {
        const data = action.payload.doc.data();
        const post: Post = {
          id: data.id,
          text: data.text,
          authorId: data.authorId,
          holidayId: data.holidayId,
          created: data.created
        };

        return {
          type: `[Post Firestore] ${action.type}`,
          payload: {post: post}
        };
      }));
  }
}
