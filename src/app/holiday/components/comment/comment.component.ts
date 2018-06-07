import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import {MtravelUser} from '../../../auth/services/auth.service';
import {CommentDTO} from '../../models/comment';

@Component({
  selector: 'app-comment',
  template: `
    <div class="comment-body">
      <span class="author">{{authorName}} </span>
      <span class="message">{{text}}</span>
    </div>
    <div class="info">
      <span class="created-text">{{date}} um {{time}}</span>
    </div>
  `,
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @Input()
  comment: CommentDTO;

  @Input()
  author: MtravelUser;

  get text() {
    return this.comment.text;
  }

  get date() {
    return moment(this.comment.created).format('Do MMMM');
  }

  get time() {
    return moment(this.comment.created).format('LT');
  }

  get authorName() {
    return this.author.displayName;
  }
}
