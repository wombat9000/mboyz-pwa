import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {HolidayDTO} from '../../models/holiday';
import {MtravelUser} from '../../../auth/services/auth.service';
import {PostDTO} from '../../models/post';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import {Create} from '../../actions/post.actions';
import * as uuid from 'uuid';


@Component({
  selector: 'app-post-box',
  template: `
    <mat-form-field class="message-input">
  <textarea matInput
            matTextareaAutosize
            data-qa="post-input"
            (keyup.enter)="submitPost()"
            [(ngModel)]="postInput"
            placeholder="Neuer Beitrag ..."></textarea>
    </mat-form-field>
    <div class="posts-container">
      <div class="post" *ngFor="let post of posts" [@fadeIn]>
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
export class PostBoxComponent {

  @Input()
  holiday: HolidayDTO;
  @Input()
  activeUser: MtravelUser;
  @Input()
  posts: PostDTO[];

  postInput = '';

  constructor(private store: Store<fromRoot.State>) {
  }

  submitPost() {
    const post: PostDTO = {
      id: uuid(),
      text: this.postInput,
      commentIds: [],
      holidayId: this.holiday.id,
      authorId: this.activeUser.id,
      created: moment().toISOString()
    };

    this.store.dispatch(new Create({record: post}));
    this.postInput = '';
  }
}
