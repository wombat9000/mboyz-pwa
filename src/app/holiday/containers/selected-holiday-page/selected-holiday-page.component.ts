import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import {ActivatedRoute} from '@angular/router';
import * as fromHoliday from '../../reducers';
import {getSelectedPosts} from '../../reducers';
import {Observable} from 'rxjs/index';
import * as holidayActions from '../../actions/holiday.actions';
import {MtravelUser} from '../../../auth/services/auth.service';
import * as fromAuth from '../../../auth/reducers';
import {HolidayDTO} from '../../models/holiday';
import {PostDTO} from '../../models/post';
import {filter, map, tap} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-selected-holiday-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-holiday-detail
      [holiday]="holiday$ | async"
      [posts]="posts$ | async"
      [activeUser]="activeUser$ | async">
    </app-holiday-detail>
  `,
  styles: []
})
export class SelectedHolidayPageComponent implements OnInit {
  holiday$: Observable<HolidayDTO> = this.store.select(fromHoliday.getSelectedHoliday).pipe(
    filter<HolidayDTO>((it: HolidayDTO | null) => it !== null)
  );

  posts$: Observable<PostDTO[]> = this.store.select(getSelectedPosts).pipe(
    map(it => {
      return it.sort((some, other) => {
        return moment(some.created).isAfter(moment(other.created)) ? 0 : 1;
      });
    }));


  activeUser$: Observable<MtravelUser> = this.store.select(fromAuth.getUser).pipe(
    filter<MtravelUser>((it: MtravelUser | null) => it !== null),
    tap(console.log)
  );

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.store.dispatch(new holidayActions.Select({id: id}));
    }
  }
}
