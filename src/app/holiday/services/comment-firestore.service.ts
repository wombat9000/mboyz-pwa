import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {MbComment} from '../models/comment';


@Injectable()
export class CommentFirestore {

  constructor(private afs: AngularFirestore) {
  }

  public observeChangesFrom(path: string): Observable<DocumentChangeAction> {
    return this.afs.collection(path).stateChanges()
      .mergeMap(it => it);
  }

  save(comment: MbComment) {
    return this.afs.doc(`comments/${comment.id}`).set(comment);
  }
}
