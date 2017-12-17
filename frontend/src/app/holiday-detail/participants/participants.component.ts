import { Component, OnInit } from '@angular/core';


class Participant {
  constructor(readonly name: string) {}
}


@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  participating = [];
  notParticipating = [];

  constructor() { }

  ngOnInit() {
    this.participating.push(new Participant('Sarah'));
    this.participating.push(new Participant('Paula'));
    this.participating.push(new Participant('Axel'));
    this.participating.push(new Participant('Jens'));
    this.notParticipating.push(new Participant('Batman'));
    this.notParticipating.push(new Participant('Wonder Woman'));
    this.notParticipating.push(new Participant('Darth Vader'));
  }
}
