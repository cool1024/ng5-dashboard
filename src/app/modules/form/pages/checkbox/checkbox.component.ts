import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  checkboxValue = [1, 2, 3];
  radioValue = 1;

  checkboxs = [{ text: 'Apple', value: 1 }, { text: 'Banana', value: 2 }, { text: 'Carota', value: 3 }];
  radios = [{ text: '先生', value: 1 }, { text: '女士', value: 2 }, { text: '保密', value: 3 }];

  constructor() { }

  ngOnInit() { }

  // 全选
  checkedAllCheckbox() {
    this.checkboxValue = [1, 2, 3];
  }

  // 清空
  cancelAllCheckbox() {
    this.checkboxValue = [];
  }
}
