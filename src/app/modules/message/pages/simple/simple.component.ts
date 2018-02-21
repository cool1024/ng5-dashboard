import { Component, OnDestroy } from '@angular/core';
import { TSToastService, TSConfirmService } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';
import { ReconnectingWebSocket } from '../../../../dashboard/classes/websocket.class';
import { StorageService } from '../../../../dashboard/services/storage.service';
import { FormService } from '../../../../dashboard/services/form.service';
import { HttpConfig } from '../../../../config/http.config';

@Component({
    selector: 'app-simple',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnDestroy {

    popoverPosition = 'left';
    message = '';
    ws: ReconnectingWebSocket;
    constructor(
        private toastService: TSToastService,
        private confirmService: TSConfirmService,
        private request: RequestService,
        private storage: StorageService,
        private form: FormService,
    ) { }

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
        const url_params = this.form.jsonToArray(this.storage.gets(['ng-params-one', 'ng-params-two', 'ng-params-three']));
        this.ws = this.request.websocket(`/${url_params.join('/')}`);
        this.ws.onopen = (event) => {
            this.message += 'socket open\n';
        };
        this.ws.onmessage = (event) => {
            if (event.data === 'error') {
                this.ws.close(1000, 'error');
            }
            this.message += `message : ${event.data}\n`;
        };
        this.ws.onclose = (event) => {

        };
    }

    sendMessage(message: string) {
        if (this.ws !== undefined && this.ws !== null) {
            console.log(message);
            this.ws.send(message);
        }
    }

    ngOnDestroy() {
        if (this.ws !== undefined && this.ws !== null) {
            this.ws.close(1000, 'refresh');
        }
    }


}
