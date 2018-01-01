import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Holiday} from '../../holiday.service';
import {Post, PostFirestore} from '../../post-firestore.service';
import {Observable} from 'rxjs/Observable';
import {AuthService, User} from '../../../core/auth.service';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.scss']
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
          return some.created.isAfter(other.created) ? 0 : 1;
        });
      });
  }


  submitPost() {
    const post = new Post(uuid(), this.user.uid, this.holiday.id, this.postInput, moment());

    this.postService.save(post);
    this.postInput = '';
  }
}
