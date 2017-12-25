import {Component, OnInit} from '@angular/core';
import {Holiday, HolidayService} from '../holiday.service';
import {v4 as uuid} from 'uuid';


class HolidayFormModel {
  constructor(public name: string) {
  }

  asHoliday() {
    return new Holiday(uuid(), this.name, []);
  }
}

@Component({
  selector: 'app-holiday-create',
  templateUrl: './holiday-create.component.html',
  styleUrls: ['./holiday-create.component.scss']
})
export class HolidayCreateComponent implements OnInit {

  holiday = new HolidayFormModel('');

  constructor(private holidayService: HolidayService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    return this.holidayService.create(this.holiday.asHoliday());
  }
}
