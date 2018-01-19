import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TSMapService, MapStyles } from '../../../../tools-ui';

@Component({
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    @ViewChild('map') map: any;

    consoleLog: { [key: string]: any } = {
        message: '点击对应按钮，获取调用结果'
    };

    mapStatus = false;

    constructor(private mapService: TSMapService, private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.mapService.doFuc(() => {
            this.mapStatus = true;
            this.map.setMarker([116.480983, 40.0958]);
            this.changeDetectorRef.detectChanges();
        });
    }

    getAddressInfo(address: string) {
        this.mapService.getPositionByAddress(address).subscribe(res => {
            this.consoleLog = res;
            // 这里的数据无法实时更新到视图中，需要手动刷新视图
            this.changeDetectorRef.detectChanges();
        });
    }

    getMyLocationInfo() { }

    getPointDistance(lng1: number, lat1: number, lng2: number, lat2: number) {
        return this.mapService.geometryUtil((gutil, amap) => {
            this.consoleLog = {
                point1: { lng1, lat1 },
                point2: { lng2, lat2 },
                distance: gutil.distance(new amap.LngLat(lng1, lat1), new amap.LngLat(lng2, lat2)),
            };
        });
    }

    randomStyle() {
        this.map.setMapStyle(MapStyles[new Date().getSeconds() % 10]);
    }

    randomCenter() {
        this.map.setMarker([116.480983 + Math.random(), 40.0958 + Math.random()]);
    }

}
