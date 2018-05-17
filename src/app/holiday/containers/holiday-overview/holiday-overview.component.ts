import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromHoliday from '../../reducers';
import {Holiday} from '../../models/holiday';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {SetTitle} from '../../../core/actions/app-bar.actions';

@Component({
  selector: 'app-holiday-overview',
  template: `
    <button
      class="add-holiday"
      mat-fab
      routerLink="/holiday/create">
      <mat-icon>add</mat-icon>
    </button>


    <mat-list role="list">
  <span *ngFor="let holiday of holidays$ | async">
    <mat-list-item role="listitem" (click)="goToDetail(holiday.id)">
      <div class="holiday-item">
      <div>
        <span class="holiday-name">{{holiday.name}}</span>
      </div>

      <div>
        <span class="created-text">Erzeugt am {{formatDate(holiday.created)}} um {{formatTime(holiday.created)}}</span>
      </div>
        </div>
    </mat-list-item>
    <mat-divider></mat-divider>
  </span>
    </mat-list>
  `,
  styleUrls: ['./holiday-overview.component.scss']
})
export class HolidayOverviewPageComponent implements OnInit {

  holidays$: Observable<Holiday[]>;

  constructor(private store: Store<fromHoliday.State>,
              private router: Router) {
  }

  ngOnInit() {
    this.holidays$ = this.store.select(fromHoliday.selectAll).pipe(
      map(this.sortByDate)
    );

    // TODO:test
    this.store.dispatch(new SetTitle({newTitle: 'holidays'}));
  }

  goToDetail(holidayId: string) {
    return this.router.navigateByUrl(`/holiday/${holidayId}`);
  }

  formatDate(isoString: string): string {
    return moment(isoString).format('Do MMMM');
  }

  formatTime(isoString: string): string {
    return moment(isoString).format('LT');
  }

  private sortByDate(holidays: Holiday[]) {
    return holidays
      .filter(it => it.created !== undefined)
      .sort((some, other) => {
        return moment(some.created).isAfter(moment(other.created)) ? 0 : 1;
      });
  }
}
