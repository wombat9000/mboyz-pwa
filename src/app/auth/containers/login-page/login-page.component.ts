import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import {FacebookLogin} from '../../actions/auth.actions';
import * as fromAuth from '../../reducers';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-login-page',
  template: `
    <div *ngIf="pending$ | async; else login">
      <mat-spinner></mat-spinner>
    </div>

    <ng-template #login>
      <div class="padded">
        <h2>Hallo!</h2>
        <p>Du musst Dich bei Facebook anmelden, um den Urlaubsplaner zu nutzen.</p>
      </div>

      <button mat-button class="button-fb" (click)="fbLogin()">Mit Facebook verbinden</button>

      <div class="login-error padded" *ngIf="error$ | async as error">
        <h3>Es ist ein Fehler aufgetreten.</h3>
        <p>{{error}}</p>
      </div>
    </ng-template>
  `,
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  pending$: Observable<boolean> = this.store.select(fromAuth.getLoginPagePending);
  error$: Observable<string | null > = this.store.select(fromAuth.getErrorMessage);

  constructor(private store: Store<fromAuth.State>) {
  }

  fbLogin() {
    this.store.dispatch(new FacebookLogin());
  }
}
