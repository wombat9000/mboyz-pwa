import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {MtravelUser} from '../../../auth/services/auth.service';
import {PostDTO} from '../../models/post';
import {CommentDTO} from '../../models/comment';
import * as fromRoot from '../../../reducers/index';
import {Store} from '@ngrx/store';
import * as fromHoliday from '../../reducers/index';
import * as uuid from 'uuid';
import {Observable} from 'rxjs/index';
import {filter, map} from 'rxjs/operators';
import {Create} from '../../actions/comment.actions';
import {getUserForId} from '../../reducers';


@Component({
  selector: 'app-comment-box',
  template: `
    <div class="comments-container">
      <div class="comment" *ngFor="let comment of comments$ | async">
        <app-comment [comment]="comment"
                     [author]="authorOf(comment.authorId) | async">
        </app-comment>
      </div>
    </div>
    <app-comment-field (submitComment)="submitComment($event)"></app-comment-field>
  `,
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  @Input()
  post: PostDTO;
  @Input()
  activeUser: MtravelUser;
  comments$: Observable<CommentDTO[]>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.comments$ = this.store.select(fromHoliday.getCommentsForPostId(this.post.id)).pipe(
      map(it => {
        return it.sort((some, other) => {
          return moment(some.created).isAfter(moment(other.created)) ? 1 : 0;
        });
      }));
  }

  submitComment(text: string) {
    const comment: CommentDTO = {
      id: uuid(),
      text: text,
      postId: this.post.id,
      holidayId: this.post.holidayId,
      authorId: this.activeUser.id,
      created: moment().toISOString()
    };

    this.store.dispatch(new Create({record: comment}));
  }

  authorOf(userId: string): Observable<MtravelUser> {
    return this.store.select(getUserForId(userId)).pipe(
      filter<MtravelUser>((it: MtravelUser | null) => it !== null)
    );
  }
}
