import { Component } from '@angular/core';
import { TSModalService, TSToastService } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';
import 'rxjs/add/operator/finally';

@Component({
    templateUrl: './menu-model.modal.html'
})
export class MenuModelModalComponent {

    // 权限模块信息
    model = { id: 0, title: '' };

    constructor(private modalService: TSModalService, private request: RequestService, private toast: TSToastService) { }

    dismiss() {
        this.modalService.dismiss();
    }

    // 更新或添加
    updateOrAdd(handle: any) {
        if (this.model.id > 0) {
            this.request.put('/menu/model/update', this.model, false).subscribe(res => {
                if (res.result) {
                    this.modalService.close();
                    this.toast.success('更新成功', '模块修改成功～');
                }
                handle.ready();
            });
        } else {
            this.request.post('/menu/model/add', this.model, false).subscribe(res => {
                if (res.result) {
                    this.modalService.close();
                    this.toast.success('新增成功', '添加模块成功～');
                }
                handle.ready();
            });
        }

    }
}
