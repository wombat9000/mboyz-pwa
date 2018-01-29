import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Post} from './post-firestore.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

export interface Comment {
  id: string;
  text: string;
  postId: string;
  holidayId: string;
  authorId: string;
  created: string;
}

@Injectable()
export class CommentFirestore {

  constructor(private afs: AngularFirestore) {
  }

  observeByPost(post: Post): Observable<Comment[]> {
    const angularFirestoreCollection: AngularFirestoreCollection<Comment> =
      this.afs.collection(`holidays/${post.holidayId}/posts/${post.id}/comments`);

    return angularFirestoreCollection.valueChanges();
  }

  save(comment: Comment) {
    return this.afs.doc(`holidays/${comment.holidayId}/posts/${comment.postId}/comments/${comment.id}`).set(comment);
  }
}
