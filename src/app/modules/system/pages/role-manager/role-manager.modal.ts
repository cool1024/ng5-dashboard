import { Component, OnInit } from '@angular/core';
import { TSModalService, TSToastService, TSSelectService } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';
import { FormService } from '../../../../dashboard/services/form.service';
import 'rxjs/add/operator/finally';


@Component({
    templateUrl: './role-manager.modal.html'
})
export class RoleManagerModalComponent implements OnInit {

    // 角色信息
    role = {
        id: 0,
        name: '',
        description: '',
        permissions: '',
        parentid: 0,
    };

    // 角色下拉选项列表
    roles = new Array<{ value: number, text: string }>();

    // 权限模块列表
    models = new Array<{ id: number, name: string }>();

    // 权限列表
    permissions = new Array<{ id: number, modelid: number, name: string }>();

    // 权限开启状态
    switchs = new Array<boolean>();

    constructor(
        private modalService: TSModalService,
        private request: RequestService,
        private toast: TSToastService,
        private formService: FormService,
        private selectService: TSSelectService,
    ) { }

    ngOnInit() {
        this.request.url('/role/permissions').subscribe(res => {
            const rolePermission = this.role.permissions ? this.role.permissions.split(',') : [];
            this.models = res.datas.models;
            this.permissions = res.datas.permissions;
            this.permissions.forEach(permission => {
                let flag = false;
                rolePermission.forEach(p => {
                    if (permission.id === parseInt(p, 10)) {
                        flag = true;
                    }
                });
                this.switchs.push(flag);

            });
            console.log(this.switchs);
        });
        this.request.url('/admin/roles ').subscribe(res => {
            this.roles = this.selectService.formatSelectOptions(res.datas, { value: 'id', text: 'name' });
        });
    }

    dismiss() {
        this.modalService.dismiss();
    }

    // 更新或保存
    updateOrSave(handle: any) {
        console.log(this.switchs);
        // if (this.admin.id > 0) {
        //     this.request.put('/admin/update', this.admin, false).subscribe(res => {
        //         if (res.result) {
        //             this.modalService.close();
        //             this.toast.success('更新成功', '账号修改成功～');
        //         }
        //         handle.ready();
        //     });
        // } else {
        //     this.request.post('/admin/add', this.admin, false).subscribe(res => {
        //         if (res.result) {
        //             this.modalService.close();
        //             this.toast.success('新增成功', '添加账号成功～');
        //         }
        //         handle.ready();
        //     });
        // }
        handle.ready();
    }

    getPermissionsByModel(modelid: number) {
        return this.permissions.filter(e => e.modelid === modelid);
    }
}
