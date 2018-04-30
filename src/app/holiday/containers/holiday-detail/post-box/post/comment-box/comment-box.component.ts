import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {AuthService, MtravelUser} from '../../../../../../auth/services/auth.service';
import {Post} from '../../../../../models/post';
import {MbComment} from '../../../../../models/comment';
import * as fromRoot from '../../../../../../reducers';
import {Store} from '@ngrx/store';
import {Create} from '../../../../../actions/comment.actions';
import * as fromHoliday from '../../../../../reducers';
import * as uuid from 'uuid';


@Component({
  selector: 'app-comment-box',
  template: `
    <div class="comments-container">
      <div class="comment" *ngFor="let comment of comments$ | async">
        <app-comment [comment]="comment"></app-comment>
      </div>
    </div>
    <app-comment-field (submitComment)="submitComment($event)"></app-comment-field>
  `,
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  @Input()
  post: Post;
  comments$: Observable<MbComment[]>;
  user: MtravelUser;

  constructor(private store: Store<fromRoot.State>,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.activeUser().subscribe(it => this.user = it);

    this.comments$ = this.store.select(fromHoliday.getCommentsForPostId(this.post.id))
      .map(it => {
        return it.sort((some, other) => {
          return moment(some.created).isAfter(moment(other.created)) ? 1 : 0;
        });
      });
  }

  submitComment(text: string) {
    const comment: MbComment = {
      id: uuid(),
      text: text,
      postId: this.post.id,
      holidayId: this.post.holidayId,
      authorId: this.user.uid,
      created: moment().toISOString()
    };

    this.store.dispatch(new Create({comment: comment}));
  }
}
