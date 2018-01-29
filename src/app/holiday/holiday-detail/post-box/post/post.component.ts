import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../services/post-firestore.service';
import {UserFirestore} from '../../../../auth/services/user-firestore.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../../auth/services/auth.service';
import * as moment from 'moment';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input()
  post: Post;

  user$: Observable<User>;

  constructor(private userFS: UserFirestore) {
  }

  ngOnInit() {
    this.user$ = this.userFS.observeById(this.post.authorId);
  }

  formatDate(isoString: string): string {
    return moment(isoString).format('Do MMMM');
  }

  formatTime(isoString: string): string {
    return moment(isoString).format('LT');
  }
}
