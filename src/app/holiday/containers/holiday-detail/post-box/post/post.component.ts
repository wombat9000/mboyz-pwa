import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {Post} from '../../../../services/post-firestore.service';
import {MtravelUser} from '../../../../../auth/services/auth.service';
import {UserFirestore} from '../../../../../auth/services/user-firestore.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input()
  post: Post;

  user$: Observable<MtravelUser>;

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
