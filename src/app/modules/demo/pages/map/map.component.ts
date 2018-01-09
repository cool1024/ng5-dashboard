import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TSMapService, MapStyles } from '../../../../tools-ui';

@Component({
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

    @ViewChild('map') map: any;

    testLocationInfo = { result: false };

    constructor(private mapService: TSMapService) { }

    ngOnInit() { }

    ngAfterViewInit() {
        // 只能在视图加载完毕的时候操作地图
        this.map.setMarker([116.480983, 40.0958]);
    }

    getAddressInfo(address: string) {
        this.mapService.getPositionByAddress(address).subscribe(res => {
            this.testLocationInfo = res;
        });
    }

    getMyLocationInfo() {
        // this.map.getMyLocation().subscribe(res => {
        //     console.log(res);
        // });
    }

    randomStyle() {
        this.map.setMapStyle(MapStyles[new Date().getSeconds() % 10]);
    }

    randomCenter() {
        this.map.setMarker([116.480983 + Math.random(), 40.0958 + Math.random()]);
        // this.map.setCenter([Math.floor(Math.random() * 150), Math.floor(Math.random() * 170)]);
    }

}
