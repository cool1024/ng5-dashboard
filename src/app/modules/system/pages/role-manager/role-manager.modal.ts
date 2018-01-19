import { Component, OnInit } from '@angular/core';
import { TSModalService, TSToastService, TSSelectService } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';
import { FormService } from '../../../../dashboard/services/form.service';

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
    switchs = new Array<boolean[]>();

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
            this.models.forEach(model => {
                const permissionSwitchs = <boolean[]>[];
                this.getPermissionsByModel(model.id).forEach(permission => {
                    let flag = false;
                    rolePermission.forEach(p => {
                        if (permission.id === parseInt(p, 10)) {
                            flag = true;
                        }
                    });
                    permissionSwitchs.push(flag);
                });
                this.switchs.push(permissionSwitchs);
            });
            // this.permissions.forEach(permission => {
            //     let flag = false;
            //     rolePermission.forEach(p => {
            //         if (permission.id === parseInt(p, 10)) {
            //             flag = true;
            //         }
            //     });
            //     this.switchs.push(flag);

            // });
        });
        this.request.url('/admin/roles ').subscribe(res => {
            this.roles = this.selectService.formatSelectOptions(res.datas, { value: 'id', text: 'name' });
            this.roles.unshift({ value: 0, text: '无上级角色' });
        });
    }

    dismiss() {
        this.modalService.dismiss();
    }

    // 更新或保存
    updateOrSave(handle: any) {
        const permissions = new Array<number>();
        this.switchs.forEach((e, i) => {
            if (e) {
                permissions.push(this.permissions[i].id);
            }
        });
        this.role.permissions = permissions.join();
        console.log(this.permissions);
        if (this.role.id > 0) {
            this.request.put('/role/update', this.role, false).subscribe(res => {
                if (res.result) {
                    this.modalService.close();
                    this.toast.success('更新成功', '账号修改成功～');
                }
                handle.ready();
            });
        } else {

            this.request.post('/role/add', this.role, false).subscribe(res => {
                if (res.result) {
                    this.modalService.close();
                    this.toast.success('新增成功', '添加账号成功～');
                }
                handle.ready();
            });
        }
    }

    getPermissionsByModel(modelid: number) {
        return this.permissions.filter(e => e.modelid === modelid);
    }
}
