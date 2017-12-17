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
  invited = [];

  constructor() { }

  ngOnInit() {
    this.participating.push(new Participant('Sarah'));
    this.participating.push(new Participant('Paula'));
    this.participating.push(new Participant('Axel'));
    this.participating.push(new Participant('Jens'));
    this.participating.push(new Participant('Indra'));
    this.participating.push(new Participant('Bastian'));
    this.participating.push(new Participant('Benni'));
    this.invited.push(new Participant('Silvia'));
    this.invited.push(new Participant('Laura'));
    this.invited.push(new Participant('Patrick'));
    this.notParticipating.push(new Participant('Jule'));
    this.notParticipating.push(new Participant('Jasmin'));
    this.notParticipating.push(new Participant('Vadim'));
    this.notParticipating.push(new Participant('Caro'));
    this.notParticipating.push(new Participant('Gereon'));

    [this.participating, this.invited, this.notParticipating].map(it => it.sort(function(a, b){
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    }));
  }
}
