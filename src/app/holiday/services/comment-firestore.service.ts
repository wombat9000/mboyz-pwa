import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {MbComment} from '../models/comment';
import {Post} from '../models/post';


@Injectable()
export class CommentFirestore {

  constructor(private afs: AngularFirestore) {
  }

  observeByPost(post: Post): Observable<MbComment[]> {
    const angularFirestoreCollection: AngularFirestoreCollection<MbComment> =
      this.afs.collection(`holidays/${post.holidayId}/posts/${post.id}/comments`);

    return angularFirestoreCollection.valueChanges();
  }

  save(comment: MbComment) {
    return this.afs.doc(`holidays/${comment.holidayId}/posts/${comment.postId}/comments/${comment.id}`).set(comment);
  }
}
