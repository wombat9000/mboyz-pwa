import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../auth/reducers';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  user$ = this.store.select(fromAuth.getUser);

  title = 'mtravel';

  constructor(private store: Store<fromAuth.State>) {
  }

  ngOnInit() {
  }
}
