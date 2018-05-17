import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {Holiday} from '../models/holiday';
import {mergeMap} from 'rxjs/internal/operators';


@Injectable()
export class HolidayFirestore {

  constructor(private afs: AngularFirestore) {
  }

  public observeChanges(): Observable<DocumentChangeAction<Holiday>> {
    return this.afs.collection<Holiday>('holidays').stateChanges().pipe(
      mergeMap(action => action)
    );
  }

  public observeById(holidayId: string): Observable<Holiday | undefined> {
    return this.afs.doc<Holiday>(`holidays/${holidayId}`).valueChanges();
  }

  public save(holiday: Holiday): Promise<void> {
    return this.afs.doc(`holidays/${holiday.id}`).set(holiday);
  }
}
