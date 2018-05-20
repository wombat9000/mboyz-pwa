import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {mergeMap} from 'rxjs/operators';
import {DbRecord} from '../models/DbRecord';


@Injectable()
export class FirestoreService {

  constructor(private afs: AngularFirestore) {
  }

  public observeUpdates<T>(path: string): Observable<DocumentChangeAction<T>> {
    return this.afs.collection<T>(path).stateChanges().pipe(
      mergeMap(it => it));
  }

  save(docPath: string, record: DbRecord): Promise<void> {
    return this.afs.doc(`${docPath}/${record.id}`).set(record);
  }
}
