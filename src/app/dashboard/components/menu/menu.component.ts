import { Component, OnInit } from '@angular/core';
import { Theme } from '../../../config/theme.config';
import { Menus } from '../../../config/menu.config';

@Component({
  selector: 'dashboard-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // 菜单样式配置参数
  menuConfigs = Theme.menu;

  // 系统菜单列表
  menus = Menus;

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
