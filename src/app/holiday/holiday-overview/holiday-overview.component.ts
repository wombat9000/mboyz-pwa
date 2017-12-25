import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Holiday, HolidayService} from '../holiday.service';

@Component({
  selector: 'app-holiday-overview',
  templateUrl: './holiday-overview.component.html',
  styleUrls: ['./holiday-overview.component.scss']
})
export class HolidayOverviewComponent implements OnInit {

  constructor(private holidayService: HolidayService,
              private router: Router) {
  }

  holidays: Holiday[] = [];

  ngOnInit() {
    this.holidays = this.holidayService.getHolidays();
  }

  gotoCreate() {
    return this.router.navigateByUrl('/holiday/create');
  }

  goToDetail(holidayId: string) {
    return this.router.navigateByUrl(`/holiday/${holidayId}`);
  }
}
