import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Holiday} from '../../model/holiday';
import {HolidayService} from '../../services/holiday.service';

@Component({
  selector: 'app-holiday-detail',
  template: `
    <div *ngIf="holiday$ | async as holiday">
      <h1>{{holiday.name}}</h1>
      <app-post-box [holiday]="holiday"></app-post-box>
    </div>
  `,
  styleUrls: ['./holiday-detail.component.scss']
})
export class HolidayDetailPageComponent implements OnInit {
  holiday$: Observable<Holiday>;

  constructor(private route: ActivatedRoute,
              private holidayService: HolidayService) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.holiday$ = this.holidayService.findById(id);
  }
}
