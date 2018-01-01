import {Component, Input, OnInit} from '@angular/core';
import {Comment, Post} from '../../../../post-firestore.service';
import {CommentFirestore} from './comment-firestore.service';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {v4 as uuid} from 'uuid';
import {AuthService, User} from '../../../../../core/auth.service';


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
          return some.created.isAfter(other.created) ? 1 : 0;
        });
      });
  }

  submitComment() {
    const comment = new Comment(uuid(), this.post.id, this.post.holidayId, this.user.uid, this.commentInput, moment());

    this.commentFirestore.save(comment);
    this.commentInput = '';
  }
}
