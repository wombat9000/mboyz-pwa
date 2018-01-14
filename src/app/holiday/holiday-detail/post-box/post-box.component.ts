import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Post, PostFirestore} from '../../post-firestore.service';
import {Observable} from 'rxjs/Observable';
import {AuthService, User} from '../../../core/auth.service';
import {v4 as uuid} from 'uuid';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {Holiday} from '../../model/holiday';

@Component({
  selector: 'app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        animate('0.3s ease-in', keyframes([
          style({opacity: 0}),
          style({opacity: 1})
        ]))
      ])
    ])
  ]
})
export class PostBoxComponent implements OnInit {

  @Input()
  holiday: Holiday;

  posts$: Observable<Post[]>;

  postInput = '';

  user: User;

  constructor(private postService: PostFirestore,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.activeUser().subscribe(it => this.user = it);

    this.posts$ = this.postService.observeByHolidayId(this.holiday.id)
      .map(it => {
        return it.sort((some, other) => {
          return moment(some.created).isAfter(moment(other.created)) ? 0 : 1;
        });
      });
  }

  submitPost() {
    const post: Post = {
      id: uuid(),
      text: this.postInput,
      holidayId: this.holiday.id,
      authorId: this.user.uid,
      created: moment().toISOString()
    };

    this.postService.save(post);
    this.postInput = '';
  }
}
