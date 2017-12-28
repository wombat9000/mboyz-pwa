import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {v4 as uuid} from 'uuid';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {Moment} from 'moment';

export class Post {
  constructor(readonly author: string,
              readonly message: string,
              readonly created: Moment,
              readonly comments: Comment[] = []) {
  }
}

export class Comment {
  constructor(readonly author: string,
              readonly comment: string,
              readonly created: Moment) {
  }
}

export interface AfsPost {
  id: string;
  author: string;
  message: string;
  created: string;
}

@Injectable()
export class PostFirestore {

  constructor(private afs: AngularFirestore) {
  }

  public observeByHolidayId(holidayId: string): Observable<Post[]> {
    const angularFirestoreCollection: AngularFirestoreCollection<AfsPost> = this.afs.collection(`holidays/${holidayId}/posts`);
    const observable: Observable<AfsPost[]> = angularFirestoreCollection.valueChanges();

    return observable.map(array => {
      return array.map(rawPost => new Post(rawPost.author, rawPost.message, moment(rawPost.created), []));
    });
  }

  public save(holidayId: string, posts: Post) {
    const data = {
      id: uuid(),
      author: posts.author,
      message: posts.message,
      created: posts.created.toISOString()
    };

    console.log('trying to post:', data);
    return this.afs.doc(`holidays/${holidayId}/posts/${data.id}`).set(data);
  }
}
