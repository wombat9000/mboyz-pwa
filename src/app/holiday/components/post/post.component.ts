import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import {MtravelUser} from '../../../auth/services/auth.service';
import {PostDTO} from '../../models/post';
import {CommentDTO} from '../../models/comment';
import * as uuid from 'uuid';
import {Create} from '../../actions/comment.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-post',
  template: `
    <div class="post-body">
      <div class="body">
        <span class="author">{{author.displayName}} </span>
        <span class="message">{{post.text}}</span>
      </div>
      <div class="info">
        <span class="created-text">{{formatDate(post.created)}} um {{formatTime(post.created)}}</span>
      </div>
    </div>
    <div class="comments">
      <app-comment-box [post]="post"
                       [comments]="comments"
                       [activeUser]="activeUser"
                       (submitComment)="submitComment($event)">
      </app-comment-box>
    </div>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input()
  post: PostDTO;
  @Input()
  comments: CommentDTO[];
  @Input()
  author: MtravelUser;
  @Input()
  activeUser: MtravelUser;

  constructor(private store: Store<fromRoot.State>) {
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

  formatDate(isoString: string): string {
    return moment(isoString).format('Do MMMM');
  }

  formatTime(isoString: string): string {
    return moment(isoString).format('LT');
  }
}
