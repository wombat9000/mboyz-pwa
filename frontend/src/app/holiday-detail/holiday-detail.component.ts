import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-holiday-detail',
  templateUrl: './holiday-detail.component.html',
  styleUrls: ['./holiday-detail.component.scss']
})
export class HolidayDetailComponent implements OnInit {
  anreise = new FormControl(new Date(2018, 2, 17));
  abreise = new FormControl(new Date(2018, 2, 24));

  name = 'Skiurlaub März \'18';

  constructor() { }

  ngOnInit() {
  }

}
