import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MtravelUser} from '../../../auth/services/auth.service';
import {PostDTO} from '../../models/post';
import {CommentDTO} from '../../models/comment';
import * as fromRoot from '../../../reducers/index';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {getUserForId} from '../../reducers';


@Component({
  selector: 'app-comment-box',
  template: `
    <div class="comments-container">
      <div class="comment" *ngFor="let comment of comments">
        <app-comment [comment]="comment"
                     [author]="authorOf(comment.authorId) | async">
        </app-comment>
      </div>
    </div>
    <app-comment-field (submitComment)="newComment.emit($event)"></app-comment-field>
  `,
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent {

  @Input()
  post: PostDTO;
  @Input()
  comments: CommentDTO[];
  @Output()
  newComment = new EventEmitter<String>();

  constructor(private store: Store<fromRoot.State>) {
  }

  authorOf(userId: string): Observable<MtravelUser> {
    return this.store.select(getUserForId(userId)).pipe(
      filter<MtravelUser>((it: MtravelUser | null) => it !== null)
    );
  }
}
