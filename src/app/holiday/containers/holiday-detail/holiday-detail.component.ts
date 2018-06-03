import {Component, Input, OnInit} from '@angular/core';
import * as fromRoot from '../../../reducers';
import {Store} from '@ngrx/store';
import {HolidayDTO} from '../../models/holiday';
import {MtravelUser} from '../../../auth/services/auth.service';
import {PostDTO} from '../../models/post';
import {SetTitle} from '../../../core/actions/app-bar.actions';

@Component({
  selector: 'app-holiday-detail',
  template: `
    <h1>{{holiday.name}}</h1>
    <app-post-box [holiday]="holiday"
                  [activeUser]="activeUser"
                  [posts]="posts">
    </app-post-box>
  `,
  styles: [`
    :host {
      display: block;
      padding: 10px;
      margin: auto;
      background-color: aliceblue;
    }
  `]
})
export class HolidayDetailPageComponent implements OnInit {
  @Input()
  holiday: HolidayDTO;
  @Input()
  activeUser: MtravelUser;
  @Input()
  posts: PostDTO[];

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new SetTitle({newTitle: 'overview'}));
  }
}
