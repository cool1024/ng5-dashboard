import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // 菜单样式配置参数
  menuConfigs = {
    angleIconWidth: '30px',
    titleIconWidth: '30px',
    mainMenuHeight: '40px',
    mainMenuClass: 'text-dark',
    mainMenuActiveClass: 'text-info',
    childMenuHeight: '37px',
    childMenuActiveClass: 'text-info',
    width: '220px',
    marginTop: '60px',
  };

  // 系统菜单列表
  menus = [
    {
      icon: 'fa fa-table fa-fw',
      title: '功能表格',
      chidren: [
        { title: '标准表格', url: '/table/simple' },
        { title: '复杂表格', url: '/table/full' },
        { title: '自定义表格', url: '/table/diy' },
      ]
    },
    {
      icon: 'fa fa-folder-open-o fa-fw',
      title: '文件上传',
      chidren: [
        { title: '单图上传', url: '/' },
        { title: '多图上传', url: '/' },
        { title: '视频上传', url: '/' },
        { title: '简单文件', url: '/' },
      ]
    },
    {
      icon: 'fa fa-pencil-square-o fa-fw',
      title: '编辑器',
      chidren: [
        { title: 'Markdown编辑器', url: '/' },
        { title: '富文本', url: '/' },
        { title: '在线聊天', url: '/' },
      ]
    },
  ];

  // 菜单展开状态列表
  isCollopseArray = new Array<boolean>();

  constructor() { }

  ngOnInit() {

    // 默认收起所有的菜单
    for (let i = 0; i < this.menus.length; i++) {
      this.isCollopseArray.push(false);
    }
  }

  // 展开指定菜单
  openMenu(index: number) {
    this.closeAllMenu();
    this.isCollopseArray[index] = true;
  }

  // 菜单状态反转
  triggerMenu(index: number) {
    if (this.isCollopseArray[index] === true) {
      this.isCollopseArray[index] = false;
    } else {
      this.openMenu(index);
    }
  }

  // 收起所有的菜单
  closeAllMenu() {
    for (let i = 0; i < this.menus.length; i++) {
      this.isCollopseArray[i] = false;
    }
  }

}
