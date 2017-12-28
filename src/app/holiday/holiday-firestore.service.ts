import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Holiday} from './holiday.service';


@Injectable()
export class HolidayFirestore {


  holidaysCollection: AngularFirestoreCollection<Holiday>;
  holidays: Observable<Holiday[]>;

  constructor(private afs: AngularFirestore) {
    this.holidaysCollection = this.afs.collection('holidays');
    this.holidays = this.holidaysCollection.valueChanges();
  }

  public observeById(holidayId: string): Observable<Holiday> {
    return this.afs.doc<Holiday>(`holidays/${holidayId}`).valueChanges();
  }

  public save(holiday: Holiday) {
    const data = {
      id: holiday.id,
      name: holiday.name
    };

    return this.afs.doc(`holidays/${holiday.id}`).set(data);
  }
}
