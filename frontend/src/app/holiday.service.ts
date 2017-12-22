import { Injectable } from '@angular/core';
import {Post} from './holiday-detail/post-box/post-box.component';

export class Holiday {
  constructor(readonly name: string, readonly posts: Post[]) {}
}

@Injectable()
export class HolidayService {

  constructor() { }

  create(holiday: Holiday) {

  }
}
