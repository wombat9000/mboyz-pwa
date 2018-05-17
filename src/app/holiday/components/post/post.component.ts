import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {MtravelUser} from '../../../auth/services/auth.service';
import {UserService} from '../../../auth/services/user.service';
import {Post} from '../../models/post';

@Component({
  selector: 'app-post',
  template: `
    <div class="post-body" *ngIf="user$ | async as user">
      <div class="body">
        <span class="author">{{user.displayName}}</span>
        <span class="message">{{post.text}}</span>
      </div>
      <div class="info">
        <span class="created-text">{{formatDate(post.created)}} um {{formatTime(post.created)}}</span>
      </div>
    </div>
    <div class="comments">
      <app-comment-box [post]="post"></app-comment-box>
    </div>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input()
  post: Post;

  user$: Observable<MtravelUser | undefined>;

  constructor(private userFS: UserService) {
  }

  ngOnInit() {
    this.user$ = this.userFS.observeById(this.post.authorId);
  }

  formatDate(isoString: string): string {
    return moment(isoString).format('Do MMMM');
  }

  formatTime(isoString: string): string {
    return moment(isoString).format('LT');
  }
}
