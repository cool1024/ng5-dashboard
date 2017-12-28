import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../dashboard/services/request.service';
import { TSModalService, TSConfirmService, TSToastService } from './../../../../tools-ui';
import { ToastService } from '../../../../tools-ui/components/toast/toast.service';
import { PermissionManagerModalComponent } from './permission-manager.modal';
import { FormService } from '../../../../dashboard/services/form.service';
import { PermissionModelModalComponent } from './permission-model.modal';

@Component({
    selector: 'app-permission-manager',
    templateUrl: './permission-manager.component.html',
    styleUrls: ['./permission-manager.component.css']
})
export class PermissionManagerComponent implements OnInit {

    // 模块列表
    models = new Array<{ id: number, name: string }>();

    // 权限列表
    permissions = new Array<{ id: number, modelid: number, name: string, description: string, key: string }>();

    constructor(
        private request: RequestService,
        private confirm: TSConfirmService,
        private modalService: TSModalService,
        private toast: ToastService,
        private formService: FormService
    ) { }

    ngOnInit() {
        this.loadDatas();
    }

    // 重载数据
    loadDatas() {
        this.request.url('/permission/all').subscribe(res => {
            this.models = res.datas.models;
            this.permissions = res.datas.permissions;
        });
    }

    // 删除确认
    deletePermissionConfirm(permission: any) {
        this.confirm.danger('确认删除', `您确定要权限'${permission.name}'，操作不可回复！`, { okTitle: '确认', cancelTitle: '取消' })
            .next(() => {
                this.request.delete('/permission/delete', { permissionid: permission.id }).subscribe(() => {
                    this.loadDatas();
                    this.toast.success('删除成功', '成功删除权限～');
                });
            });
    }

    // 删除确认-权限模块
    deletePermissionModelConfirm(model: any) {
        this.confirm.danger('确认删除', `您确定要权限'${model.name}'，操作不可回复！`, { okTitle: '确认', cancelTitle: '取消' })
            .next(() => {
                this.request.delete('/permission/model/delete', { modelid: model.id }).subscribe(() => {
                    this.loadDatas();
                    this.toast.success('删除成功', '成功删除权限模块～');
                });
            });
    }

    // 弹出添加/编辑窗口--权限
    showPermissionModal(params: any | number) {
        this.modalService.create(PermissionManagerModalComponent);
        if (typeof params !== 'number') {
            this.modalService.modal.instance.permission = this.formService.jsonCopy(params);
        } else {
            this.modalService.modal.instance.permission.modelid = params;
        }
        this.modalService.open().next(() => {
            this.loadDatas();
        });
    }

    // 弹出添加/编辑窗口--权限模块
    showPermissionModelModal(model: any = null) {
        this.modalService.create(PermissionModelModalComponent);
        if (model !== null) {
            this.modalService.modal.instance.model = this.formService.jsonCopy(model);
        }
        this.modalService.open().next(() => {
            this.loadDatas();
        });
    }

    // 获取指定模块的权限
    getPermissionByModelId(modelId: number): Array<{ id: number, modelid: number, name: string, description: string, key: string }> {
        return this.permissions.filter(permission => permission.modelid === modelId);
    }

}
