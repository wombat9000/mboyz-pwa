import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Moment} from 'moment';

export interface Post {
  readonly id: string;
  readonly message: string;
  readonly holidayId: string;
  readonly authorId: string;
  readonly created: string;
}

export class Comment {
  constructor(readonly id: string,
              readonly postId: string,
              readonly holidayId: string,
              readonly authorId: string,
              readonly text: string,
              readonly created: Moment) {
  }
}

@Injectable()
export class PostFirestore {

  constructor(private afs: AngularFirestore) {
  }

  public observeByHolidayId(holidayId: string): Observable<Post[]> {
    const holidayPostsCollection: AngularFirestoreCollection<Post> = this.afs.collection(`holidays/${holidayId}/posts`);
    return holidayPostsCollection.valueChanges();
  }

  public save(post: Post) {
    return this.afs.doc(`holidays/${post.holidayId}/posts/${post.id}`).set(post);
  }
}
