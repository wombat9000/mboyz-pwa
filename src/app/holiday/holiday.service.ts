import {Injectable} from '@angular/core';
import {Post} from './holiday-detail/post-box/post-box.component';
import {HolidayFirestore} from './holiday-firestore.service';
import {Observable} from 'rxjs/Observable';

export class Holiday {
  constructor(readonly id: string, readonly name: string, readonly posts: Post[]) {
  }
}

@Injectable()
export class HolidayService {

  constructor(private holidayFS: HolidayFirestore) {
  }

  create(holiday: Holiday): Promise<void> {
    return this.holidayFS.save(holiday);
  }

  getHolidays(): Observable<Holiday[]> {
    return this.holidayFS.holidays;
  }

  findById(id: string): Observable<Holiday> {
    return this.holidayFS.observeById(id);
  }
}
