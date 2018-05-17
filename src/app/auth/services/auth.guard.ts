import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {Unauthorised} from '../actions/auth.actions';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.State>) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    return this.store.select(fromAuth.getUser).pipe(
      map(user => !!user),
      tap(auth => {
        if (!auth) {
          this.store.dispatch(new Unauthorised({url: state.url}));
        }
      }));
  }
}
