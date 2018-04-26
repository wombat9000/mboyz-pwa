import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers/index';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
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
