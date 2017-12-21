import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';


export class Post {
  constructor(readonly author: string, readonly message: string, readonly created: Moment) {
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
    this.posts.push(new Post('Bastian Stone', 'Willkommen auf der mboyz Seite!', moment('2016-01-01')));
  }

  submitPost() {
    this.posts.push(new Post('Max Mustermann', this.postInput, moment()));
    this.postInput = '';
  }
}
