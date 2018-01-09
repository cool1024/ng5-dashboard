import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MapConfig } from './map.config';

declare const window: any;
declare const document: any;

@Injectable()
export class MapService {

    private loadHandle: Observable<any>;
    private ready = false;
    private map: any;

    constructor(private mapConfig: MapConfig) {
        const sub = new Subject<any>();
        if (!window.AMap) {
            const node: any = document.createElement('script');
            node.type = 'text/javascript';
            node.src = 'http://webapi.amap.com/maps?v=1.4.3&key=' + mapConfig.appKey;
            node.charset = 'utf-8';
            node.onload = () => {
                this.map = window.AMap;
                this.ready = true;
                sub.next(window.AMap);
                sub.complete();
            };
            this.loadHandle = sub.asObservable();
            document.getElementsByTagName('head')[0].appendChild(node);
        } else {
            this.ready = true;
        }
    }

    doFuc(func: (amap: any) => void) {
        if (this.ready) {
            func(this.map);
        } else {
            this.loadHandle.subscribe(() => func(this.map));
        }
    }

    getPositionByAddress(address: string): Observable<{ result: boolean, datas: any }> {
        const sub = new Subject<{ result: boolean, datas: any }>();
        this.doFuc(() => {
            window.AMap.service('AMap.Geocoder', _ => {
                const geocoder = new window.AMap.Geocoder({});
                geocoder.getLocation(address, (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        sub.next({ result: true, datas: result });
                    } else {
                        sub.next({ result: false, datas: result });
                    }
                    sub.complete();
                });
            });
        });
        return sub.asObservable();
    }
}
