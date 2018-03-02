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

  public observeChangesByHolidayId(holidayId: string): Observable<DocumentChangeAction[]> {
    return this.afs.collection<Post>(`holidays/${holidayId}/posts`).stateChanges();
  }

  public save(post: Post) {
    return this.afs.doc(`holidays/${post.holidayId}/posts/${post.id}`).set(post);
  }
}
