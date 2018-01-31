import { Component, OnInit } from '@angular/core';
import { TSToastService, TSConfirmService } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';
import { ReconnectingWebSocket } from '../../../../dashboard/classes/websocket.class';
import { StorageService } from '../../../../dashboard/services/storage.service';
@Component({
    selector: 'app-simple',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {

    popoverPosition = 'left';
    message = '';
    ws: ReconnectingWebSocket;
    constructor(
        private toastService: TSToastService,
        private confirmService: TSConfirmService,
        private request: RequestService,
        private storage: StorageService,
    ) { }

    ngOnInit() { }

    get confirm(): TSConfirmService {
        return this.confirmService;
    }

    get toast(): TSToastService {
        return this.toastService;
    }

    startWebSocket() {
        if (this.ws !== undefined && this.ws !== null) {
            this.ws.close(1000, 'refresh');
        }
        this.ws = this.request.websocket('ws://127.0.0.1:9502', [
            this.storage.get('ng-params-one'),
            this.storage.get('ng-params-two'),
            this.storage.get('ng-params-three'),
        ]);
        this.ws.onopen = (event) => {
            this.message += 'socket open\n';
        };
        this.ws.onmessage = (event) => {
            this.message += `message : ${event.data}\n`;
        };
    }

    sendMessage() {

    }


}
