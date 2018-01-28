import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromAuth from '../reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.State>,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    return this.store.select(fromAuth.getUser)
      .map(user => !!user)
      .do(auth => {
        if (!auth) {
          // TODO turn this into an effect
          this.router.navigate(['/login']);
        }
      });
  }
}
