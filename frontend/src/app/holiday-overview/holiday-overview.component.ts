import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-holiday-overview',
  templateUrl: './holiday-overview.component.html',
  styleUrls: ['./holiday-overview.component.scss']
})
export class HolidayOverviewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoCreate() {
    return this.router.navigateByUrl('/holiday/create');
  }
}
