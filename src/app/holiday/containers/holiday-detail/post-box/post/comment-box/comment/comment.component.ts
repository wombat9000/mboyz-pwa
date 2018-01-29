import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {User} from '../../../../../../../auth/services/auth.service';
import {UserFirestore} from '../../../../../../../auth/services/user-firestore.service';
import {Comment} from '../../../../../../services/comment-firestore.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: Comment;

  user$: Observable<User>;

  constructor(private userFS: UserFirestore) {
  }

  ngOnInit() {
    this.user$ = this.userFS.observeById(this.comment.authorId);
  }

  formatDate(isoString: string): string {
    return moment(isoString).format('Do MMMM');
  }

  formatTime(isoString: string): string {
    return moment(isoString).format('LT');
  }
}
