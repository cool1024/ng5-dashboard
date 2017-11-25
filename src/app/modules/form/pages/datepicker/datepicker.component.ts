import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './datepicker.component.html',
})
export class DatepickerComponent {

  weekTitles = ['一', '二', '三', '四', '五', '六', '日'];
  monthTitles = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

  constructor() { }

  date = { year: 2017, month: 11, day: 23 };

  dateEmpty: { year: number, month: number, day: number };

  time = { hour: 12, minute: 30, second: 59 };

  timeEmpty: { hour: number, minute: number, second: number };

}
