import {Injectable} from '@angular/core';
import {Post} from './holiday-detail/post-box/post-box.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {v4 as uuid} from 'uuid';

export class Holiday {
  constructor(readonly id: string, readonly name: string, readonly posts: Post[]) {
  }
}

@Injectable()
export class HolidayService {

  private holidays: BehaviorSubject<Holiday[]> = new BehaviorSubject([
    new Holiday(uuid(), 'Skiurlaub 2018', []),
    new Holiday(uuid(), 'Skiurlaub 2017', []),
    new Holiday(uuid(), 'Skiurlaub 2016', [])
  ]);

  constructor() {
  }

  create(holiday: Holiday) {
    const nextHolidays = this.getHolidays();
    nextHolidays.push(holiday);
    return this.holidays.next(nextHolidays);
  }

  getHolidays(): Holiday[] {
    return this.holidays.getValue();
  }

  findById(id: string): Holiday {
    return this.getHolidays().find(it => it.id === id);
  }
}
