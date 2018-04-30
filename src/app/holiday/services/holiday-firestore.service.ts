import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {Holiday} from '../models/holiday';


@Injectable()
export class HolidayFirestore {

  constructor(private afs: AngularFirestore) {
  }

  public observeChanges(): Observable<DocumentChangeAction[]> {
    return this.afs.collection('holidays').stateChanges();
  }

  public observeById(holidayId: string): Observable<Holiday | null> {
    return this.afs.doc<Holiday>(`holidays/${holidayId}`).valueChanges();
  }

  public save(holiday: Holiday): Promise<void> {
    return this.afs.doc(`holidays/${holiday.id}`).set(holiday);
  }
}
