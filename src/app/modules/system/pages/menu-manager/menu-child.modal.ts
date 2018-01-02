import { Component, OnInit } from '@angular/core';
import { TSModalService, TSToastService, TSSelectService } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';

@Component({
    templateUrl: './menu-child.modal.html'
})
export class MenuChildModalComponent implements OnInit {

    // 权限模块信息
    menu = { id: 0, title: '', icon: '#', url: '', mid: 0, parentid: 0, permissionid: 0 };

    // 权限列表
    permissions = [];

    constructor(
        private modalService: TSModalService,
        private request: RequestService,
        private toast: TSToastService,
        private select: TSSelectService,
    ) { }

    ngOnInit() {
        this.request.url('/menu/permissions').subscribe(res => {
            this.permissions = this.select.formatSelectOptions(res.datas.permissions, { value: 'id', text: 'name' });
            this.permissions.unshift({ value: 0, text: '无需权限' });
        });
    }

    dismiss() {
        this.modalService.dismiss();
    }

    // 更新或添加
    updateOrAdd(handle: any) {
        if (this.menu.id > 0) {
            this.request.put('/menu/update', this.menu, false).subscribe(res => {
                if (res.result) {
                    this.modalService.close();
                    this.toast.success('更新成功', '菜单修改成功～');
                }
                handle.ready();
            });
        } else {
            this.request.post('/menu/add', this.menu, false).subscribe(res => {
                if (res.result) {
                    this.modalService.close();
                    this.toast.success('新增成功', '添加菜单成功～');
                }
                handle.ready();
            });
        }

    }
}
