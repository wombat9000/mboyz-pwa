import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers/index';
import * as fromRoot from '../../reducers/index';

@Component({
  selector: 'app-top-bar',
  template: `
    <mat-toolbar color="primary">
      <span routerLink="/">{{ appName }}</span>
      <span class="spacer"></span>
      <div>{{ title$ | async }}</div>
      <span class="spacer"></span>
      <div *ngIf="user$ | async as user">
        <app-user-menu [user]="user"></app-user-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class TopBarComponent implements OnInit {

  // TODO: show back button when not on home?
  // TODO: indicate offline status
  // TODO: check for updates with service worker

  user$ = this.store.select(fromAuth.getUser);
  appName = 'mtravel';
  title$ = this.store.select(fromRoot.getTitle);

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }
}
