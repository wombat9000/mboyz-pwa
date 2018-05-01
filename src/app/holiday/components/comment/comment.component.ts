import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {MtravelUser} from '../../../auth/services/auth.service';
import {MbComment} from '../../models/comment';
import {UserService} from '../../../auth/services/user.service';

@Component({
  selector: 'app-comment',
  template: `
    <div class="comment-body" *ngIf="user$ | async as user">
      <span class="author">{{user.displayName}}</span>
      <span class="message">{{text}}</span>
    </div>
    <div class="info">
      <span class="created-text">{{date}} um {{time}}</span>
    </div>
  `,
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: MbComment;

  user$: Observable<MtravelUser | null>;

  constructor(private userFS: UserService) {
  }

  get text() {
    return this.comment.text;
  }

  get date() {
    return moment(this.comment.created).format('Do MMMM');
  }

  get time() {
    return moment(this.comment.created).format('LT');
  }

  ngOnInit() {
    this.user$ = this.userFS.observeById(this.comment.authorId);
  }
}
