import { FontAwesome } from './fontawesome.class';

export class Breadcrumb {
    private fontawesome: FontAwesome;
    constructor(private title: string, private icon: string | FontAwesome, private url?: string) {
        if (typeof icon === 'string') {
            this.fontawesome = new FontAwesome(icon);
        } else {
            this.fontawesome = icon;
        }
    }
    get json(): { title: string, icon: string, url: string } {
        return { title: this.title, icon: this.fontawesome.iconClass, url: this.url || null };
    }
}

export class Breadcrumbs {
    public breadcrumbs: Breadcrumb[];
    constructor(private breadcrumbStrs: Array<[string, string] | [string, string, string]>) {
        this.breadcrumbs = new Array<Breadcrumb>();
        this.breadcrumbStrs.forEach(breadcrumbStr => {
            this.breadcrumbs.push(new Breadcrumb(breadcrumbStr[0], breadcrumbStr[1], breadcrumbStr[2] || null));
        });
    }
}
