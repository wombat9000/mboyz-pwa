import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {NotAuthenticated} from '../actions/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.State>) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    return this.store.select(fromAuth.getUser)
      .map(user => !!user)
      .do(auth => {
        if (!auth) {
          this.store.dispatch(new NotAuthenticated());
        }
      });
  }
}
