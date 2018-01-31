import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {Post} from '../../../../services/post-firestore.service';
import {MtravelUser} from '../../../../../auth/services/auth.service';
import {UserFirestore} from '../../../../../auth/services/user-firestore.service';

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

  user$: Observable<MtravelUser>;

  constructor(private userFS: UserFirestore) {
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
