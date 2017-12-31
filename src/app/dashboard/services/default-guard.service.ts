import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalValueService } from './global-value.service';

@Injectable()
export class DefaultGuardService implements CanActivate {

    constructor(private global: GlobalValueService) { }

    canActivate(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        this.global.setValue('checkStatus', true);
        return true;
    }
}
