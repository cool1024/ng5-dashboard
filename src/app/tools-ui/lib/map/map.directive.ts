import { Directive, Input, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MapService } from './map.service';
import { DefaultConfig } from './default.config';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Directive({
    selector: 'div[ts-map]',
    exportAs: 'tsMap',
})
export class MapDirective implements AfterViewInit {

    @Input() center: [number, number];
    @Input() zoom: number;
    @Input() options: any;

    @Output() loadMap = new EventEmitter<any>(false);

    amap: any;
    map: any;
    marker: any;

    get mapOptions(): { [key: string]: string | number | [number, number] } {
        const options = {
            zoom: this.zoom,
            center: this.center,
            mapStyle: this.options.mapStyle,
        };
        return options;
    }

    get isReady(): boolean {
        return this.map !== null && this.map !== undefined;
    }

    constructor(private elementRef: ElementRef, private mapService: MapService) {
        this.center = [116.39, 39.9];
        this.zoom = 10;
        this.options = DefaultConfig;
    }

    ngAfterViewInit() {
        this.mapService.doFuc(amap => {
            this.options.zoom = this.zoom;
            this.options.center = this.center;
            this.map = new amap.Map(this.elementRef.nativeElement, this.mapOptions);
            this.loadMap.emit(this.map);
        });
    }

    getMyLocation(): Observable<{ result: boolean, data: any }> {
        const sub = new Subject<{ result: boolean, data: any }>();
        // this.mapService.doFuc((amap) => {
        //     this.map.plugin('AMap.Geolocation', function () {
        //         const geolocation = new amap.Geolocation({
        //             enableHighAccuracy: true,
        //             timeout: 10000,
        //             buttonOffset: new amap.Pixel(10, 20),
        //             zoomToAccuracy: true,
        //             buttonPosition: 'RB'
        //         });
        //         this.map.addControl(geolocation);
        //         geolocation.getCurrentPosition();
        //         amap.event.addListener(geolocation, 'complete', data => { sub.next({ result: true, data }); sub.complete(); });
        //         amap.event.addListener(geolocation, 'error', error => { sub.next({ result: true, data: error }); sub.complete(); });
        //     });
        // });
        return sub.asObservable();
    }

    setMarker(position: [number, number]) {
        this.mapService.doFuc((amap) => {
            if (!this.marker) {
                this.marker = new amap.Marker({
                    map: this.map,
                    position: position
                });
            } else {
                this.map.remove([this.marker]);
                this.marker = new amap.Marker({
                    map: this.map,
                    position: position
                });
            }
            this.map.setCenter(position);
        });
    }

    setCenter(center: [number, number]) { this.map.setCenter(center); }

    setMapStyle(mapStyle: string) { this.map.setMapStyle(mapStyle); }

    setZoom(zoom: number) { this.map.setZoom(zoom); }

}
