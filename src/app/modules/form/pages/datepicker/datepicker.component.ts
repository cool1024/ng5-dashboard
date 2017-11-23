import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './datepicker.component.html',
})
export class DatepickerComponent {

  constructor() { }

  date = { year: 2017, month: 11, day: 23 };
}
