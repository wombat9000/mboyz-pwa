import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {MbComment} from '../models/comment';
import {mergeMap} from 'rxjs/operators';


@Injectable()
export class CommentFirestore {

  constructor(private afs: AngularFirestore) {
  }

  public observeChangesFrom<T>(path: string): Observable<DocumentChangeAction<T>> {
    return this.afs.collection<T>(path).stateChanges().pipe(
      mergeMap(it => it));
  }

  save(comment: MbComment) {
    return this.afs.doc(`comments/${comment.id}`).set(comment);
  }
}
