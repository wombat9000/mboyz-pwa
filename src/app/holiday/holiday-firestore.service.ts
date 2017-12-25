import {Injectable} from '@angular/core';
import {User} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Holiday} from './holiday.service';

@Injectable()
export class HolidayFirestoreService {

  holidaysCollection: AngularFirestoreCollection<Holiday>;
  holidays: Observable<Holiday[]>;

  constructor(private afs: AngularFirestore) {
    this.holidaysCollection = this.afs.collection('holidays');
    this.holidays = this.holidaysCollection.valueChanges();
  }

  public observeById(holidayId: string): Observable<User> {
    return this.afs.doc<User>(`holidays/${holidayId}`).valueChanges();
  }

  public save(holiday: Holiday) {
    return this.afs.doc(`users/${holiday.id}`).set(holiday);
  }
}
