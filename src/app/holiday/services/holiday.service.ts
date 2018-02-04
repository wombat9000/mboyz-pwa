import {Injectable} from '@angular/core';
import {HolidayFirestore} from './holiday-firestore.service';
import {Observable} from 'rxjs/Observable';
import {DocumentChangeAction} from 'angularfire2/firestore';
import {Holiday} from '../models/holiday';

@Injectable()
export class HolidayService {

  constructor(private holidayFS: HolidayFirestore) {
  }

  create(holiday: Holiday): Promise<void> {
    return this.holidayFS.save(holiday);
  }

  findById(id: string): Observable<Holiday> {
    return this.holidayFS.observeById(id);
  }

  changesToCollection(): Observable<DocumentChangeAction[]> {
    return this.holidayFS.observeChanges();
  }
}
