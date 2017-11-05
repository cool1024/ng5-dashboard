import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  // 下拉选择数据
  selects = [
    { text: 'Apple', value: 1 },
    { text: 'Banana', value: 2 },
    { text: 'Carota', value: 3 },
    { text: 'Dinner ', value: 4 },
  ];

  selectValue1 = 'Amsterdam';
  selectValue2 = 2;
  constructor() { }

  ngOnInit() { }

}
