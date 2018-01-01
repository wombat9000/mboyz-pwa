import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Comment, Post} from '../../../../post-firestore.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import * as moment from 'moment';

export class AfsComment {
  id: string;
  postId: string;
  holidayId: string;
  authorId: string;
  text: string;
  created: string;
}

@Injectable()
export class CommentFirestore {

  constructor(private afs: AngularFirestore) {
  }

  observeByPost(post: Post): Observable<Comment[]> {
    const angularFirestoreCollection: AngularFirestoreCollection<AfsComment> =
      this.afs.collection(`holidays/${post.holidayId}/posts/${post.id}/comments`);

    const observable: Observable<AfsComment[]> = angularFirestoreCollection.valueChanges();

    return observable.map(array => {
      return array.map(rawComment => new Comment(
        rawComment.id,
        rawComment.postId,
        rawComment.holidayId,
        rawComment.authorId,
        rawComment.text,
        moment(rawComment.created)));
    });
  }

  save(comment: Comment) {
    const data: AfsComment = {
      id: comment.id,
      postId: comment.postId,
      holidayId: comment.holidayId,
      authorId: comment.authorId,
      text: comment.text,
      created: comment.created.toISOString()
    };

    return this.afs.doc(`holidays/${data.holidayId}/posts/${data.postId}/comments/${data.id}`).set(data);
  }
}
