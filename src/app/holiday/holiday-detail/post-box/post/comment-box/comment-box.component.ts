import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../../post-firestore.service';
import {Comment, CommentFirestore} from './comment-firestore.service';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {v4 as uuid} from 'uuid';
import {AuthService, User} from '../../../../../auth/services/auth.service';


@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  @Input()
  post: Post;

  comments$: Observable<Comment[]>;
  commentInput = '';
  user: User;

  constructor(private commentFirestore: CommentFirestore,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.activeUser().subscribe(it => this.user = it);

    this.comments$ = this.commentFirestore.observeByPost(this.post)
      .map(it => {
        return it.sort((some, other) => {
          return moment(some.created).isAfter(moment(other.created)) ? 1 : 0;
        });
      });
  }

  submitComment() {
    const comment: Comment = {
      id: uuid(),
      text: this.commentInput,
      postId: this.post.id,
      holidayId: this.post.holidayId,
      authorId: this.user.uid,
      created: moment().toISOString()
    };

    this.commentFirestore.save(comment);
    this.commentInput = '';
  }
}
