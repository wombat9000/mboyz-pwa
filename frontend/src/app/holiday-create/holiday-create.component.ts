import {Component, OnInit} from '@angular/core';
import {Holiday, HolidayService} from '../holiday.service';


class HolidayFormModel {
  constructor(public name: string) {
  }

  asHoliday() {
    return new Holiday(this.name, []);
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
    this.holidayService.create(this.holiday.asHoliday());
  }
}
