import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';


export class Post {
  constructor(readonly author: string,
              readonly message: string,
              readonly created: Moment,
              readonly comments: Comment[] = []) {
  }
}

export class Comment {
  constructor(readonly author: string,
              readonly comment: string,
              readonly created: Moment) {
  }
}

@Component({
  selector: 'app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.scss']
})
export class PostBoxComponent implements OnInit {

  posts: Post[] = [];
  postInput = '';

  constructor() {
  }

  ngOnInit() {
    const someDate = moment('2016-01-01');
    const laterDate = moment('2016-01-02');

    const someComment = new Comment('Sarah Lüken', 'Das hier ist ein Kommentar. Kommentare sind einem Post zugeordnet.', someDate);
    const anotherComment = new Comment('Axel Grünert', 'Kommentare sind auch chronologisch sortiert, Älteste zuerst', laterDate);
    const someComments = [someComment, anotherComment];
    const someMessage = 'Willkommen auf der mboyz Seite! Das hier ist ein Post. ' +
      'Posts sind chronologisch sortiert, Neuere werden zuerst angezeigt.' +
      'Expansion panel for comments?';
    const moi = 'Bastian Stone';
    this.posts.push(new Post(moi, someMessage, someDate, someComments));
  }

  submitPost() {
    this.insertPost(new Post(
      'Max Mustermann',
      this.postInput, moment()));
    this.postInput = '';
  }

  private insertPost(post: Post) {
    this.posts.push(post);
    this.posts.sort((a, b) => {
      return a.created.isAfter(b.created) ? 0 : 1;
    });
  }
}
