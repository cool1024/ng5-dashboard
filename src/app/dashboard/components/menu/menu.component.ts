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
      children: [
        { title: '标准表格', url: '/table/simple' },
      ]
    },
    {
      icon: 'fa fa-list-alt fa-fw',
      title: '表单',
      children: [
        { title: '基本表单', url: '/form/simple' },
        { title: '多选/单选', url: '/form/checkbox' },
        { title: '下拉选择', url: '/form/select' },
      ]
    },
    {
      icon: 'fa fa-folder-open-o fa-fw',
      title: '文件上传',
      children: [
        { title: '图片上传', url: '/upload/simple' },
      ]
    },
    {
      icon: 'fa fa-pencil-square-o fa-fw',
      title: '编辑器',
      children: [
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
