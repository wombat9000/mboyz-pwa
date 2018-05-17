import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {MtravelUser} from './auth.service';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {Observable} from 'rxjs/index';


@Injectable()
export class UserService {

  constructor(private afs: AngularFirestore) {
  }

  public observeById(userId: string): Observable<MtravelUser | undefined> {
    return this.afs.doc<MtravelUser>(`users/${userId}`).valueChanges();
  }

  public save(user: MtravelUser): Observable<void> {
    const updateUser: Promise<void> = this.afs.doc(`users/${user.uid}`).set(user);
    return fromPromise(updateUser);
  }
}
