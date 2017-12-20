import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';


export class Message {
  constructor(readonly author: string, readonly message: string, readonly created: Moment) {
  }
}

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  messages: Message[] = [];
  messageInput = '';

  constructor() {
  }

  ngOnInit() {
    this.messages.push(new Message('Bastian Stone', 'Willkommen auf der mboyz Seite!', moment('2016-01-01')));
  }

  postMessage() {
    this.messages.push(new Message('Max Mustermann', this.messageInput, moment()));
    this.messageInput = '';
  }
}
