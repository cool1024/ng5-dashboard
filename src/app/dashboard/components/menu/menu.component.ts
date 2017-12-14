import { Component, OnInit } from '@angular/core';
import { Theme } from '../../../config/theme.config';
import { Menus } from '../../../config/menu.config';
import { AuthService } from '../../services/auth.service';

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
  isCollopseArray = new Array<boolean[]>();

  constructor(private authService: AuthService) { }

  ngOnInit() {

    // 默认收起所有的菜单
    for (let i = 0; i < this.menus.length; i++) {
      const temp = new Array<boolean>();
      this.menus[i].menus.forEach(() => {
        temp.push(false);
      });
      this.isCollopseArray.push(temp);
    }
  }

  // 获取用户信息
  get menuUserInfo(): [string, string, string] {
    return this.authService.menuUserInfo();
  }

  // 展开指定菜单
  openMenu(i: number, j: number) {
    this.closeAllMenu();
    this.isCollopseArray[i][j] = true;
  }

  // 菜单状态反转
  triggerMenu(i: number, j: number) {
    if (this.isCollopseArray[i][j] === true) {
      this.isCollopseArray[i][j] = false;
    } else {
      this.openMenu(i, j);
    }
  }

  // 收起所有的菜单
  closeAllMenu() {
    for (let i = 0; i < this.menus.length; i++) {
      for (let j = 0; j < this.menus[i].menus.length; j++) {
        this.isCollopseArray[i][j] = false;
      }
    }
  }

}
