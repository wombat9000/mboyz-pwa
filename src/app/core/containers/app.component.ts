import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import * as fromRoot from '../../reducers/index';
import * as fromAuth from '../../auth/reducers/index';
import {Store} from '@ngrx/store';
import {Query, QueryStop} from '../actions/data.actions';


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
    this.store.select(fromAuth.isLoggedIn)
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.store.dispatch(new Query());
        } else {
          this.store.dispatch(new QueryStop());
        }
      });
  }
}
