import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {v4 as uuid} from 'uuid';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {Holiday} from '../../../models/holiday';
import {PostFirestore} from '../../../services/post-firestore.service';
import {AuthService, MtravelUser} from '../../../../auth/services/auth.service';
import {Post} from '../../../models/post';

@Component({
  selector: 'app-post-box',
  template: `
    <mat-form-field class="message-input">
  <textarea matInput
            matTextareaAutosize
            (keyup.enter)="submitPost()"
            [(ngModel)]="postInput"
            placeholder="Neuer Beitrag ..."></textarea>
    </mat-form-field>
    <div class="posts-container">
      <div class="post" *ngFor="let post of posts$ | async" [@fadeIn]>
        <app-post [post]="post"></app-post>
      </div>
    </div>
  `,
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

  user: MtravelUser;

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
