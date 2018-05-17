import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class PostFirestore {

  constructor(private afs: AngularFirestore) {
  }

  public observeChanges(): Observable<DocumentChangeAction<Post>> {
    return this.afs.collection<Post>('posts').stateChanges().pipe(
      mergeMap(it => it)
    );
  }

  public save(post: Post): Observable<void> {
    const success = this.afs.doc(`posts/${post.id}`).set(post);
    return fromPromise(success);
  }
}
