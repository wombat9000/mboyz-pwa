import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {v4 as uuid} from 'uuid';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {Moment} from 'moment';

export class Post {
  constructor(readonly id: string,
              readonly authorId: string,
              readonly holidayId: string,
              readonly message: string,
              readonly created: Moment) {
  }
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

export interface AfsPost {
  id: string;
  authorId: string;
  message: string;
  created: string;
}

@Injectable()
export class PostFirestore {

  constructor(private afs: AngularFirestore) {
  }

  public observeByHolidayId(holidayId: string): Observable<Post[]> {
    const holidayPostsCollection: AngularFirestoreCollection<AfsPost> = this.afs.collection(`holidays/${holidayId}/posts`);
    const posts$: Observable<AfsPost[]> = holidayPostsCollection.valueChanges();

    return posts$.map(array => {
      return array.map(rawPost => new Post(rawPost.id, rawPost.authorId, holidayId, rawPost.message, moment(rawPost.created)));
    });
  }

  public save(post: Post) {
    const data: AfsPost = {
      id: uuid(),
      authorId: post.authorId,
      message: post.message,
      created: post.created.toISOString()
    };

    console.log('trying to post:', data);
    return this.afs.doc(`holidays/${post.holidayId}/posts/${data.id}`).set(data);
  }
}
