import { Component } from '@angular/core';
import { TSModalService, TSToastService } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';

@Component({
    templateUrl: './menu-main.modal.html'
})
export class MenuMainModalComponent {

    // 权限模块信息
    menu = { id: 0, title: '', icon: '', url: '#', mid: 0, parentid: 0, permissionid: 0 };

    constructor(private modalService: TSModalService, private request: RequestService, private toast: TSToastService) { }

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
