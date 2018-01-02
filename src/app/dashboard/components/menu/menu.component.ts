import { Component, OnInit } from '@angular/core';
import { Theme } from '../../../config/theme.config';
import { Menus } from '../../../config/menu.config';
import { AuthService } from '../../services/auth.service';
import { RequestService } from '../../services/request.service';

@Component({
    selector: 'dashboard-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    // 菜单样式配置参数
    menuConfigs = Theme.menu;

    // 系统菜单列表
    menus = new Array();

    // 菜单展开状态列表
    isCollopseArray = new Array<boolean[]>();

    constructor(private authService: AuthService, private request: RequestService) { }

    ngOnInit() {
        this.request.url('/menus').subscribe(res => {
            this.menus = this.formateMenu(res.datas.groups, res.datas.models);
            this.initCollopseArray();
        });
    }

    initCollopseArray() {
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

    // 格式化菜单
    formateMenu(menus: Array<{ parentid: number, groups: Array<any> }>, models: { id: number, title: string }[]) {

        let mains: { parentid: number, groups: Array<any> };
        let mainIndex = -1;
        for (let i = 0; i < menus.length; i++) {
            if (menus[i].parentid === 0) {
                mains = menus[i];
                mainIndex = i;
                break;
            }
        }
        // not mains
        if (mainIndex < 0) {
            return [];
        }
        menus.splice(mainIndex, 1);
        const temps = new Array<{ icon: string, mid: number, title: string, children: Array<{ icon: string, title: string, url: string }> }>();
        for (let i = 0; i < mains.groups.length; i++) {
            const temp = { icon: mains.groups[i].icon, mid: mains.groups[i].mid, title: mains.groups[i].title, children: [] };
            const childs = menus.filter(e => e.parentid.toString() === mains.groups[i].id.toString());
            temp.children = childs.length > 0 ? childs[0].groups : [];
            temps.push(temp);
        }
        const _menus = [];
        for (let i = 0; i < models.length; i++) {
            const _mains = temps.filter(main => main.mid.toString() === models[i].id.toString());
            _menus.push({ title: models[i].title, menus: _mains });
        }

        return _menus;
    }

}
