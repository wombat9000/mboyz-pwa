import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../../post-firestore.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  @Input()
  post: Post;

  constructor() {
  }

  ngOnInit() {
  }

}
