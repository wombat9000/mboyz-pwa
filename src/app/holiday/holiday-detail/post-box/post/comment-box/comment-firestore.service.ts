import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Comment, Post} from '../../../../post-firestore.service';

@Injectable()
export class CommentFirestore {

  constructor() {
  }

  observeByPost(post: Post): Observable<Comment[]> {
    return null;
  }

  save(comment: Comment) {
    return null;
  }
}
