import { Component } from '@angular/core';
import { TSModalService, TSToastService } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';

@Component({
    templateUrl: './account-manager.modal.html'
})
export class AccountManagerModalComponent {

    // 账户信息
    admin = {
        id: 0,
        account: '',
        password: '',
        role: 0
    };

    // 角色下拉选项列表
    roles = new Array<{ value: number, text: string }>();

    constructor(private modalService: TSModalService, private request: RequestService, private toast: TSToastService) { }

    dismiss() {
        this.modalService.dismiss();
    }

    // 更新或删除
    updateOrSave(handle: any) {
        if (this.admin.id > 0) {
            this.request.put('/admin/update', this.admin, false).subscribe(res => {
                if (res.result) {
                    this.modalService.close();
                    this.toast.success('更新成功', '账号修改成功～');
                }
                handle.ready();
            });
        } else {
            this.request.post('/admin/add', this.admin, false).subscribe(res => {
                if (res.result) {
                    this.modalService.close();
                    this.toast.success('新增成功', '添加账号成功～');
                }
                handle.ready();
            });
        }

    }
}
