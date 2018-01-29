import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HolidayService} from '../services/holiday.service';
import {Observable} from 'rxjs/Observable';
import {Holiday} from '../model/holiday';

@Component({
  selector: 'app-holiday-detail',
  templateUrl: './holiday-detail.component.html',
  styleUrls: ['./holiday-detail.component.scss']
})
export class HolidayDetailComponent implements OnInit {
  holiday$: Observable<Holiday>;

  constructor(private route: ActivatedRoute,
              private holidayService: HolidayService) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.holiday$ = this.holidayService.findById(id);
  }
}
