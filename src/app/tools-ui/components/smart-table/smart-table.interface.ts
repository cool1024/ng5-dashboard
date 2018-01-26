import { Observable } from 'rxjs/Observable';
export interface HttpService {
    get(url: string, params?: { [key: string]: number | string } | boolean, check?: boolean): Observable<any>;
}

export interface RowItemConfig {
    type: string;
}
export interface SmartConfig {
    theads: string[];
    rows: RowItemConfig[];
    tableClass: string;
    loadConfig: {
        httpService: HttpService,
        url: string,
    };
    page: {
        limit: number
    };
    flash: {
        label: string,
        textClass: string,
        bgColor: string,
    };
}

export interface TSButton {
    text: string;
    icon: string;
    btnClass: string;
}
export class TdDiyButton implements TSButton {
    type = 'diy-button';
    text: string;
    icon: string;
    btnClass: string;
    constructor(
        public format: (item: any) => string,
        public func: (data: any) => Observable<void> | void,
    ) { }
    getString(data: { [key: string]: any }): string {
        return this.format(data);
    }
}
export class TdButton implements TSButton {
    type: string;
    text: string;
    icon: string;
    btnClass: string;
    func: (item: any) => Observable<void> | void;
    constructor(
        text: string,
        btnClass: string,
        func: (item: any) => Observable<void> | void,
        icon = '',
    ) {
        this.type = 'button';
        this.icon = icon;
        this.btnClass = btnClass;
        this.text = text;
        this.func = func;
    }
}
export class TdDropDown implements TSButton {
    text: string;
    icon: string;
    itemTexts: string[];
    btnClass: string;
    funcs: ((item: any) => Observable<void> | void)[];
    constructor(
        text: string,
        itemTexts: string[],
        btnClass: string,
        funcs: ((item: any) => Observable<void> | void)[],
        icon = '',
    ) {
        this.text = text;
        this.itemTexts = itemTexts;
        this.btnClass = btnClass;
        this.funcs = funcs;
        this.icon = icon;
    }
    public type = 'dropdown';
}

export class DiyItem {
    key: string;
    format: (item: any) => string;
    getString(datas: { [key: string]: any }): string {
        return this.format(datas[this.key]);
    }
}

export class DiyItems {
    keys: string[];
    format: (items: any[]) => string;
    getString(datas: { [key: string]: any }): string {
        const items = <any[]>[];
        this.keys.forEach(key => {
            items.push(datas[key]);
        });
        return this.format(items);
    }
}

export class DiyItemConfig extends DiyItem implements RowItemConfig {
    constructor(
        public key: string,
        public format: (item: any) => string,
    ) {
        super();
    }
    type = 'diy-item';
}

export class DiyItemsConfig extends DiyItems implements RowItemConfig {
    constructor(
        public keys: string[],
        public format: (items: any[]) => string,
    ) {
        super();
    }
    type = 'diy-items';
}

export class TextRowConfig implements RowItemConfig {
    constructor(
        public key: string,
        public textClass = 'text-dark',
    ) { }
    type = 'text';
}

export class AvatarRowConfig implements RowItemConfig {
    constructor(
        public key: string,
        public src = '',
        public size = { width: 40, height: 40 },
        public avatarClass = 'rounded-circle',
    ) { }
    type = 'avatar';
}
export class AvatarTextRowConfig implements RowItemConfig {
    constructor(
        public keys: [string, string, string],
        public src = '',
        public itemClasses: [string, string, string] = ['rounded-circle', 'text-dark', 'text-muted'],
        public size = { width: 40, height: 40 },
    ) { }
    type = 'avatar-text';
}
export class AvatarDiyRowConfig implements RowItemConfig {
    constructor(
        public keys: [string, string, string],
        public formats: ((item: any) => string)[],
        public src = '',
        public avatarClass = 'rounded-circle',
        public size = { width: 40, height: 40 },
    ) { }
    type = 'avatar-diy';
}
export class SpanRowConfig implements RowItemConfig {
    constructor(
        public key: string,
        public values: any[],
        public texts: any[],
        public spanClasses: string[],
    ) { }
    type = 'span';
    getSpanClass(datas: { [key: string]: any }) {
        const index = this.values.indexOf(datas[this.key]);
        return index < 0 ? '' : this.spanClasses[index];
    }
    getText(datas: { [key: string]: any }) {
        const index = this.values.indexOf(datas[this.key]);
        return index < 0 ? datas[this.key] : (this.texts[index] || datas[this.key]);
    }
}
export class ButtonsRowConfig implements RowItemConfig {
    constructor(
        public buttons: TSButton[],
    ) { }
    type = 'button-group';
}
export class TextGroupConfig implements RowItemConfig {
    constructor(
        public keys: [string, string],
        public textClasses = ['text-dark', 'text-muted'],
    ) { }
    type = 'text-group';
}
