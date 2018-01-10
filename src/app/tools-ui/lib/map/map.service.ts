import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MapConfig } from './map.config';
import { GeometryUtil } from './map';
declare const window: any;
declare const document: any;

@Injectable()
export class MapService {

    private loadHandle: Observable<any>;
    private ready = false;
    private amap: any;

    constructor(private mapConfig: MapConfig) {
        const sub = new Subject<any>();
        this.loadHandle = sub.asObservable();
        if (!window.AMap) {
            window.aMapLoadCallBack = () => {
                this.amap = window.AMap;
                this.ready = true;
                sub.next(window.AMap);
                sub.complete();
            };
            const node: any = document.createElement('script');
            node.async = true;
            node.type = 'text/javascript';
            node.src = `http://webapi.amap.com/maps?v=1.4.3&key=${mapConfig.appKey}&callback=aMapLoadCallBack`;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        } else {
            this.ready = true;
        }
        console.log('load js');
    }

    doFuc(func: (amap: any) => void) {
        if (this.ready) {
            func(this.amap);
        } else {
            this.loadHandle.subscribe(() => func(this.amap));
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

    geometryUtil(callback: (gutil: GeometryUtil, amap: any) => void): void {
        this.doFuc(amap => {
            callback(amap.GeometryUtil, amap);
        });
    }
}
