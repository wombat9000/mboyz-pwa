import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import * as holidayActions from '../../holiday/actions/holiday.actions';
import * as postActions from '../../holiday/actions/post.actions';
import * as fromRoot from '../../reducers/index';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-root',
  template: `
    <mat-chip-list class="env-info" *ngIf="isStaging">
      <mat-chip color="accent" selected="true">staging</mat-chip>
    </mat-chip-list>

    <app-top-bar></app-top-bar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .env-info {
      position: fixed;
      bottom: 0;
      left: 0;
    }
  `]
})
export class AppComponent implements OnInit {
  isStaging = environment.name === 'staging';

  constructor(private store: Store<fromRoot.State>) {
    moment.locale('de');
  }

  ngOnInit() {
    console.log('Application starting up, querying for data.');
    this.store.dispatch(new holidayActions.Query());
  }
}
