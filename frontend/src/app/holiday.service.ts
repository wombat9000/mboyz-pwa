import { Injectable } from '@angular/core';
import {Post} from './holiday-detail/post-box/post-box.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class Holiday {
  constructor(readonly name: string, readonly posts: Post[]) {}
}

@Injectable()
export class HolidayService {

  private holidays: BehaviorSubject<Holiday[]> = new BehaviorSubject([]);

  constructor() { }

  create(holiday: Holiday) {
    const nextHolidays = this.getHolidays();
    nextHolidays.push(holiday);
    return this.holidays.next(nextHolidays);
  }

  getHolidays(): Holiday[] {
    return this.holidays.getValue();
  }
}
