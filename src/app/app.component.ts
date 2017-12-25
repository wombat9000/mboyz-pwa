import { Component } from '@angular/core';
import * as moment from 'moment';
import {environment} from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isStaging = environment.name === 'staging';

  constructor() {
    moment.locale('de');
  }
}
