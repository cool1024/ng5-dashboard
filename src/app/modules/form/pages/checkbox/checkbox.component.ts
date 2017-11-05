import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  checkboxValue = [1, 2, 3];
  radioValue = 1;
  constructor() { }

  ngOnInit() { }

}
