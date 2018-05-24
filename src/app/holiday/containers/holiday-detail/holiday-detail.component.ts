import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as fromRoot from '../../../reducers';
import * as fromAuth from '../../../auth/reducers';
import * as fromHoliday from '../../reducers';
import {Store} from '@ngrx/store';
import {Select} from '../../actions/holiday.actions';
import {HolidayDTO} from '../../models/holiday';
import {MtravelUser} from '../../../auth/services/auth.service';
import {Observable} from 'rxjs';
import {PostDTO} from '../../models/post';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {SetTitle} from '../../../core/actions/app-bar.actions';

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
  holiday$: Observable<HolidayDTO | null> = this.store.select(fromHoliday.getSelectedHoliday);
  activeUser$: Observable<MtravelUser | null> = this.store.select(fromAuth.getUser);
  posts$: Observable<PostDTO[]> = this.store.select(fromHoliday.getSelectedPosts).pipe(
    map(it => {
      return it.sort((some, other) => {
        return moment(some.created).isAfter(moment(other.created)) ? 0 : 1;
      });
    }));

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.store.dispatch(new Select({id: id}));
    }

    // TODO: test
    this.store.dispatch(new SetTitle({newTitle: 'overview'}));
  }
}
