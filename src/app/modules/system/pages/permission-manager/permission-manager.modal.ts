import { Component } from '@angular/core';
import { TSModalService, TSToastService } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';

@Component({
    templateUrl: './permission-manager.modal.html'
})
export class PermissionManagerModalComponent {

    // 权限信息
    permission = { id: 0, modelid: 0, name: '', description: '', key: '' };

    constructor(private modalService: TSModalService, private request: RequestService, private toast: TSToastService) { }

    dismiss() {
        this.modalService.dismiss();
    }

    // 更新或删除
    updateOrSave(handle: any) {
        if (this.permission.id > 0) {
            this.request.put('/permission/update', this.permission, false).subscribe(res => {
                if (res.result) {
                    this.modalService.close();
                    this.toast.success('更新成功', '权限修改成功～');
                }
                handle.ready();
            });
        } else {
            this.request.post('/permission/add', this.permission, false).subscribe(res => {
                if (res.result) {
                    this.modalService.close();
                    this.toast.success('新增成功', '添加权限成功～');
                }
                handle.ready();
            });
        }

    }
}
