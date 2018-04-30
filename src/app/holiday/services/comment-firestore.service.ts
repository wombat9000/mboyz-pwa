import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from 'angularfire2/firestore';
import {MbComment} from '../models/comment';
import {Post} from '../models/post';


@Injectable()
export class CommentFirestore {

  constructor(private afs: AngularFirestore) {
  }

  public observeChangesFrom(path: string): Observable<DocumentChangeAction> {
    return this.afs.collection(path).stateChanges()
      .mergeMap(it => it);
  }

  save(comment: MbComment) {
    return this.afs.doc(`holidays/${comment.holidayId}/posts/${comment.postId}/comments/${comment.id}`).set(comment);
  }
}
