import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-holiday-detail',
  templateUrl: './holiday-detail.component.html',
  styleUrls: ['./holiday-detail.component.scss']
})
export class HolidayDetailComponent implements OnInit {
  name = 'Skiurlaub März \'18';

  constructor() {
  }

  ngOnInit() {
  }

}
