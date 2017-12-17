import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';


export class Message {
  constructor(readonly author: string, readonly message: string, readonly created: Moment) {}
}

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  messages: Message[] = [];

  constructor() { }

  ngOnInit() {
    this.messages.push(new Message('Benni', 'hallo ihr omas! ist der glöckner auch am start?', moment('2016-01-01')));
    this.messages.push(new Message('Sarah', 'selber oma hihi', moment('2016-01-02')));
    this.messages.push(new Message('Jens', 'ja ich bin am start!', moment('2016-01-03')));
  }

}
