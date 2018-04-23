import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Post} from '../models/post';

@Injectable()
export class PostFirestore {

  constructor(private afs: AngularFirestore) {
  }

  public observeByHolidayId(holidayId: string): Observable<Post[]> {
    return this.afs.collection<Post>(`holidays/${holidayId}/posts`).valueChanges();
  }

  public observeChanges(): Observable<DocumentChangeAction> {
    return this.afs.collection('posts').stateChanges()
      .mergeMap(it => it);
  }

  public save(post: Post): Observable<void> {
    const success = this.afs.doc(`holidays/${post.holidayId}/posts/${post.id}`).set(post);
    return Observable.fromPromise(success);
  }
}
