import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {User} from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserFirestore {

  constructor(private afs: AngularFirestore) {
  }

  public observeById(userId: string): Observable<User> {
    return this.afs.doc<User>(`users/${userId}`).valueChanges();
  }
}
