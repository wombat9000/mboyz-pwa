import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {LoginSuccess, NotAuthenticated, Unauthorised} from '../actions/auth.actions';
import {User} from './auth.service';
import {routerMocker} from '../../test-support/stubs';


class RouterStateSnapshotStub implements RouterStateSnapshot {
  url: string;
  root: ActivatedRouteSnapshot;
}

describe('AuthGuard', () => {
  let testee: AuthGuard;
  let store: Store<fromAuth.State>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          auth: combineReducers(fromAuth.reducers),
        })
      ],
      providers: [
        AuthGuard,
        {provide: Router, useFactory: routerMocker}
      ]
    });

    testee = TestBed.get(AuthGuard);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
  });

  it('should not activate when user is not authenticated', (done) => {
    store.dispatch(new NotAuthenticated());
    spyOn(store, 'dispatch');

    const stateSnap = new RouterStateSnapshotStub();
    stateSnap.url = 'someUrl';

    const canActivate = testee.canActivate(null, stateSnap);

    canActivate.subscribe(it => {
      expect(it).toBe(false);
      expect(store.dispatch).toHaveBeenCalledWith(new Unauthorised({url: 'someUrl'}));
      done();
    });
  });

  it('should activate when user is authenticated', (done) => {
    const someUser: User = {
      uid: '',
      displayName: '',
      email: ''
    };

    store.dispatch(new LoginSuccess({user: someUser}));

    const canActivate = testee.canActivate(null, null);

    canActivate.subscribe(it => {
      expect(it).toBe(true);
      done();
    });
  });
});
