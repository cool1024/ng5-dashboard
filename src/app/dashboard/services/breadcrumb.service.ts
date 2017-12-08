import { Injectable } from '@angular/core';
import { Routes, Route } from '@angular/router';
import { Breadcrumbs, Breadcrumb } from './../classes/breadcrumb.class';

@Injectable()
export class BreadcrumbService {
    private breadcrumbs = new Array<{ routeUrl: string, breadcrumbs: Breadcrumbs }>();
    append(modulePath: string, routes: Routes) {
        routes.forEach(route => {
            this.breadcrumbs.push({
                routeUrl: `/${modulePath}/${route.path}`,
                breadcrumbs: route.data ? route.data.breadcrumbs : new Breadcrumbs([])
            });
            if (route.children) {
                route.children.forEach(childRoute => {
                    this.breadcrumbs.push({
                        routeUrl: `/${modulePath}/${childRoute.path}`,
                        breadcrumbs: childRoute.data ? childRoute.data.breadcrumbs : new Breadcrumbs([])
                    });
                });
            }

        });
        console.log(this.breadcrumbs);
    }
    get(url: string): Breadcrumbs {
        for (const key in this.breadcrumbs) {
            if (this.breadcrumbs[key].routeUrl === url) {
                return this.breadcrumbs[key].breadcrumbs;
            }
        }
        return new Breadcrumbs([]);
    }
}
