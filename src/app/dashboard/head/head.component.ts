import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  // 头部样式配置参数
  headConfigs = {
    zIndex: 1040,
  };

  constructor() { }

  ngOnInit() {
  }

}
