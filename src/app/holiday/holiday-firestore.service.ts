import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from 'angularfire2/firestore';
import {Holiday} from './model/holiday';


@Injectable()
export class HolidayFirestore {


  holidaysCollection: AngularFirestoreCollection<Holiday>;
  holidays$: Observable<Holiday[]>;

  constructor(private afs: AngularFirestore) {
    this.holidaysCollection = this.afs.collection('holidays');
    this.holidays$ = this.holidaysCollection.valueChanges();
  }

  public observeChanges(): Observable<DocumentChangeAction[]> {
    return this.afs.collection('holidays').stateChanges();
  }

  public observeById(holidayId: string): Observable<Holiday> {
    return this.afs.doc<Holiday>(`holidays/${holidayId}`).valueChanges();
  }

  public save(holiday: Holiday): Promise<void> {
    return this.afs.doc(`holidays/${holiday.id}`).set(holiday);
  }
}
