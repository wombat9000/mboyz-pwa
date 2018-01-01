import {Component, Input, OnInit} from '@angular/core';
import {Comment, Post} from '../../../../post-firestore.service';
import {CommentFirestore} from './comment-firestore.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  @Input()
  post: Post;

  comments$: Observable<Comment[]>;

  constructor(private commentFirestore: CommentFirestore) {
  }

  ngOnInit() {
    this.comments$ = this.commentFirestore.observeByPost(this.post);
  }
}
