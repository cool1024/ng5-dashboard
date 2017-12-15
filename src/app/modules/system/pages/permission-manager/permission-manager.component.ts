import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../dashboard/services/request.service';

@Component({
    selector: 'app-permission-manager',
    templateUrl: './permission-manager.component.html',
    styleUrls: ['./permission-manager.component.css']
})
export class PermissionManagerComponent implements OnInit {

    constructor(private request: RequestService) { }

    // 模块列表
    models = new Array<{ id: number, name: string }>();

    // 权限列表
    permissions = new Array<{ id: number, modelid: number, name: string, description: string, key: string }>();

    ngOnInit() {
        this.request.url('/permission/all').subscribe(res => {
            this.models = res.datas.models;
            this.permissions = res.datas.permissions;
        });
    }

}
