import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {HolidayDTO} from '../../models/holiday';
import {MtravelUser} from '../../../auth/services/auth.service';
import {PostDTO} from '../../models/post';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import {Create} from '../../actions/post.actions';
import * as uuid from 'uuid';
import {CommentDTO} from '../../models/comment';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs/index';
import * as fromHoliday from '../../reducers';
import {getUserForId} from '../../reducers';


@Component({
  selector: 'app-forum',
  template: `
    <mat-form-field class="message-input">
  <textarea matInput
            matTextareaAutosize
            data-qa="post-input"
            (keyup.enter)="submitPost()"
            [(ngModel)]="postInput"
            placeholder="Neuer Beitrag ..."></textarea>
    </mat-form-field>
    <div class="posts-container">
      <div class="post" *ngFor="let post of posts" [@fadeIn]>
        <app-post [post]="post"
                  [comments]="commentsForPost(post) | async"
                  [author]="authorOf(post.authorId) | async"
                  [activeUser]="activeUser">
        </app-post>
      </div>
    </div>
  `,
  styleUrls: ['./forum.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        animate('0.3s ease-in', keyframes([
          style({opacity: 0}),
          style({opacity: 1})
        ]))
      ])
    ])
  ]
})
export class ForumComponent {

  @Input()
  holiday: HolidayDTO;
  @Input()
  activeUser: MtravelUser;
  @Input()
  posts: PostDTO[];

  postInput = '';

  constructor(private store: Store<fromRoot.State>) {
  }

  submitPost() {
    const post: PostDTO = {
      id: uuid(),
      text: this.postInput,
      holidayId: this.holiday.id,
      authorId: this.activeUser.id,
      created: moment().toISOString()
    };

    this.store.dispatch(new Create({record: post}));
    this.postInput = '';
  }

  authorOf(userId: string): Observable<MtravelUser> {
    return this.store.select(getUserForId(userId)).pipe(
      filter<MtravelUser>((it: MtravelUser | null) => it !== null)
    );
  }

  commentsForPost(post: PostDTO): Observable<CommentDTO[]> {
    return this.store.select(fromHoliday.getCommentsForPostId(post.id)).pipe(
      map(it => {
        return it.sort((some, other) => {
          return moment(some.created).isAfter(moment(other.created)) ? 1 : 0;
        });
      }));
  }
}
