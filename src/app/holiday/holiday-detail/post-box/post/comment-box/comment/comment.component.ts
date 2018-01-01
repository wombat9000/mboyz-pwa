import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../../../../post-firestore.service';
import {UserFirestore} from '../../../../../../core/user-firestore.service';
import {User} from '../../../../../../core/auth.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: Comment;

  user: Observable<User>;

  constructor(private userFS: UserFirestore) { }

  ngOnInit() {
    this.user = this.userFS.observeById(this.comment.authorId);
  }
}
