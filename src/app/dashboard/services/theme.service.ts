import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Themes } from './../../config/theme.config';
@Injectable()
export class ThemeService {

    private _theme;

    private _theme_keys = [];

    // 提供一些全局默认参数
    get theme(): { menu: any, header: any } {
        if (this._theme === undefined || this._theme === null) {
            this.loadTheme();
        }
        return this._theme;
    }

    // 修改全局默认参数
    set theme(thems: { menu: any, header: any }) {
        this._theme = thems;
    }

    constructor(private storage: StorageService) { }

    loadTheme() {
        for (const key in Themes) {
            if (Themes.hasOwnProperty(key)) {
                this._theme_keys.push(key);
            }
        }
        if (this.storage.empty(['theme'])) {
            this.loadDefault();
        } else {
            const theme_key = this.storage.get('theme');
            if (Themes.hasOwnProperty(theme_key)) {
                this._theme = Themes[theme_key];
            } else {
                this.loadDefault();
            }
        }
        localStorage.getItem('theme');
    }

    loadDefault() {
        this._theme = Themes.default;
        this.storage.set('theme', 'default');
    }

    autoTheme() {
        const theme_key = this._theme_keys[Math.floor(Math.random() * 3)];
        this._theme = Themes[theme_key];
        this.storage.set('theme', theme_key);
    }
}
