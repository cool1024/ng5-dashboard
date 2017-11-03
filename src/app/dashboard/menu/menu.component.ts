import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  //菜单样式配置参数
  menuConfigs = {
    angleIconWidth: '30px',
    titleIconWidth: '30px',
    mainMenuHeight: '40px',
    childMenuHeight: '37px',
  }

  //系统菜单列表
  menus = [
    {
      icon: 'fa fa-fw fa-comment-o',
      title: '功能表格',
      chidren: [
        { title: '标准表格', url: '/' },
        { title: '复杂表格', url: '/' },
        { title: '自定义表格', url: '/' },
      ]
    },
    {
      icon: 'fa fa-fw fa-comment-o',
      title: '文件上传',
      chidren: [
        { title: '单图上传', url: '/' },
        { title: '多图上传', url: '/' },
        { title: '视频上传', url: '/' },
        { title: '简单文件', url: '/' },
      ]
    },
  ]

  constructor() {

  }

}
