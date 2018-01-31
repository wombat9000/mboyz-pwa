import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {MtravelUser} from '../../../../../../../auth/services/auth.service';
import {UserFirestore} from '../../../../../../../auth/services/user-firestore.service';
import {Comment} from '../../../../../../services/comment-firestore.service';

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
  comment: Comment;

  user$: Observable<MtravelUser>;

  constructor(private userFS: UserFirestore) {
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
