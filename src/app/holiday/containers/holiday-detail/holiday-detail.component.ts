import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as fromRoot from '../../../reducers';
import * as fromAuth from '../../../auth/reducers';
import * as fromHoliday from '../../reducers';
import {Store} from '@ngrx/store';
import {Select} from '../../actions/holiday.actions';
import {Holiday} from '../../models/holiday';
import {MtravelUser} from '../../../auth/services/auth.service';
import {Observable} from 'rxjs/Observable';
import {Post} from '../../models/post';
import * as moment from 'moment';

@Component({
  selector: 'app-holiday-detail',
  template: `
    <div *ngIf="holiday$ | async as holiday">
      <h1>{{holiday.name}}</h1>
      <app-post-box [holiday]="holiday"
                    [activeUser]="activeUser$ | async"
                    [posts]="posts$ | async">
      </app-post-box>
    </div>
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
  holiday$: Observable<Holiday> = this.store.select(fromHoliday.getSelectedHoliday).do(console);
  activeUser$: Observable<MtravelUser> = this.store.select(fromAuth.getUser);
  posts$: Observable<Post[]> = this.store.select(fromHoliday.getSelectedPosts)
    .map(it => {
      return it.sort((some, other) => {
        return moment(some.created).isAfter(moment(other.created)) ? 0 : 1;
      });
    });

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new Select({id: id}));
  }
}
