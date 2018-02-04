import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Holiday} from '../../models/holiday';
import * as fromHoliday from '../../reducers';
import {Store} from '@ngrx/store';
import {Select} from '../../actions/holiday.actions';

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

  constructor(private store: Store<fromHoliday.State>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.holiday$ = this.store.select(fromHoliday.getSelectedHoliday);
    this.store.dispatch(new Select({id: id}));
  }
}
