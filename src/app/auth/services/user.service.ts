import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {MtravelUser} from './auth.service';
import {from as fromPromise} from 'rxjs';
import {Observable} from 'rxjs/index';
import {filter} from 'rxjs/operators';


@Injectable()
export class UserService {

  constructor(private afs: AngularFirestore) {
  }

  public observeById(userId: string): Observable<MtravelUser> {
    return this.afs.doc<MtravelUser>(`users/${userId}`).valueChanges()
      .pipe(filter<MtravelUser>(it => it !== undefined));
  }

  public save(user: MtravelUser): Observable<void> {
    const updateUser: Promise<void> = this.afs.doc(`users/${user.id}`).set(user);
    return fromPromise(updateUser);
  }
}
