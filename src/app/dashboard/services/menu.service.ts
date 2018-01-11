import { Injectable } from '@angular/core';
import { Menu, MenuGroup } from './../interfaces/menu.interface';
@Injectable()
export class MenuService {

    private _menus = new Array<Menu>();

    setMenuGroups(groups: MenuGroup[]) {
        this._menus = [];
        groups.forEach(group => {
            group.groups.forEach(menu => {
                this._menus.push(menu);
            });
        });
    }

    get menus(): Menu[] {
        return this._menus;
    }
}
