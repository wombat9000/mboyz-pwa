import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

// import * as moment from 'moment';


@Component({
  selector: 'app-date-suggest',
  template: `
    <p>Suggest a date:</p>
    <form>
      <mat-form-field>
        <input matInput [matDatepicker]="dp" placeholder="start date" [formControl]="startDate">
        <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
        <mat-datepicker #dp></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <input matInput [matDatepicker]="dp2" placeholder="end date" [formControl]="endDate">
        <mat-datepicker-toggle matSuffix [for]="dp2"></mat-datepicker-toggle>
        <mat-datepicker #dp2></mat-datepicker>
      </mat-form-field>
      <button mat-raised-button color="primary">Suggest Dates</button>
    </form>
  `,
  styleUrls: ['./date-suggest.component.scss']
})
export class DateSuggestComponent implements OnInit {

  startDate = new FormControl();
  endDate = new FormControl();


  constructor() {
  }

  ngOnInit() {
  }
}
