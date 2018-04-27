import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {MtravelUser} from './auth.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class UserFirestore {

  constructor(private afs: AngularFirestore) {
  }

  public observeById(userId: string): Observable<MtravelUser> {
    return this.afs.doc<MtravelUser>(`users/${userId}`).valueChanges();
  }

  public save(user: MtravelUser): Observable<void> {
    const updateUser: Promise<void> = this.afs.doc(`users/${user.uid}`).set(user);
    return Observable.fromPromise(updateUser);
  }
}
