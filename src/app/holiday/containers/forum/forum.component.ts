import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {HolidayDTO} from '../../models/holiday';
import {MtravelUser} from '../../../auth/services/auth.service';
import {PostDTO} from '../../models/post';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import * as postActions from '../../actions/post.actions';
import * as commentActions from '../../actions/comment.actions';
import * as uuid from 'uuid';
import {CommentDTO} from '../../models/comment';
import {filter} from 'rxjs/operators';
import {Observable} from 'rxjs';
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
                  (newComment)="submitComment($event, post.id)">
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

    this.store.dispatch(new postActions.Create({record: post}));
    this.postInput = '';
  }

  submitComment(text: string, postId: string) {
    const comment: CommentDTO = {
      id: uuid(),
      text: text,
      postId: postId,
      holidayId: this.holiday.id,
      authorId: this.activeUser.id,
      created: moment().toISOString()
    };

    this.store.dispatch(new commentActions.Create({record: comment}));
  }

  authorOf(userId: string): Observable<MtravelUser> {
    return this.store.select(getUserForId(userId)).pipe(
      filter<MtravelUser>((it: MtravelUser | null) => it !== null)
    );
  }

  commentsForPost(post: PostDTO): Observable<CommentDTO[]> {
    return this.store.select(fromHoliday.getCommentsForPostId(post.id));
  }
}
