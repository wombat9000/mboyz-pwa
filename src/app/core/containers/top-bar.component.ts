import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers/index';

@Component({
  selector: 'app-top-bar',
  template: `
    <mat-toolbar color="primary">
      <span routerLink="/">{{ title }}</span>
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

  title = 'mtravel';

  constructor(private store: Store<fromAuth.State>) {
  }

  ngOnInit() {
  }
}
