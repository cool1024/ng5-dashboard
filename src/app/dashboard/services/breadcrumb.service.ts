import { Injectable } from '@angular/core';
import { Breadcrumb } from './../classes/breadcrumb.class';

@Injectable()
export class BreadcrumbService {
    constructor() { }
    private _breadcrumbs: Breadcrumb[];
    set(breadcrumbs: Breadcrumb[]) {
        this._breadcrumbs = breadcrumbs;
    }
    get breadcrumbs(): Breadcrumb[] {
        return this._breadcrumbs || new Array<Breadcrumb>();
    }
}
