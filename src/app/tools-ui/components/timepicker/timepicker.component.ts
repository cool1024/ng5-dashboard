import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ts-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css']
})
export class TimepickerComponent implements OnInit {

  @Input() activeTime: { hour: number, minute: number, second: number };

  constructor() {
    const date = new Date();
    this.activeTime = { hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() };
  }

  ngOnInit() {

  }

  addHour() {
    if (this.activeTime.hour < 23) {
      this.activeTime.hour++;
    }
  }

  decHour() {
    if (this.activeTime.hour > 0) {
      this.activeTime.hour--;
    }
  }

  addMinute() {
    if (this.activeTime.minute < 59) {
      this.activeTime.minute++;
    }
  }

  decMinute() {
    if (this.activeTime.minute > 0) {
      this.activeTime.minute--;
    }
  }

  addSecond() {
    if (this.activeTime.second < 59) {
      this.activeTime.second++;
    }
  }

  decSecond() {
    if (this.activeTime.second > 0) {
      this.activeTime.second--;
    }
  }

  autoHour($event) {
    let offset = $event.deltaY || 0;
    offset /= 3;
    if (offset > 0) {
      for (let i = 0; i < offset; i++) {
        this.addHour();
      }
    } else {
      offset = -offset;
      for (let i = 0; i < offset; i++) {
        this.decHour();
      }
    }
  }
}
