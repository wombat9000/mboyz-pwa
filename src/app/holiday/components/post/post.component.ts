import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';
import {MtravelUser} from '../../../auth/services/auth.service';
import {PostDTO} from '../../models/post';
import {CommentDTO} from '../../models/comment';

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
                       (newComment)="newComment.emit($event)">
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
  @Output()
  newComment = new EventEmitter<String>();

  constructor() {
  }

  formatDate(isoString: string): string {
    return moment(isoString).format('Do MMMM');
  }

  formatTime(isoString: string): string {
    return moment(isoString).format('LT');
  }
}
