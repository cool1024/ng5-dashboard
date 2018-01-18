import { Component } from '@angular/core';
import { TSModalService } from './../../../../tools-ui';
import { VipUser } from '../../interfaces/vip-user';

@Component({
    template: `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">@会员详情</h5>
            <span  class="close pointer" (click)="dismiss()">
                &times;
            </span>
        </div>
        <div class="modal-body" style="height:600px;overflow:auto" [innerHTML]="htmlStr"></div>
        <div class="modal-footer">
            <button type="button" class="btn btn-white aaa" (click)="dismiss()">关闭窗口</button>
        </div>`,
})
export class VipUserInfoModalComponent {

    user: VipUser = {
        id: 0,
        nick: '',
        avatar: '',
        vip_level: 0,
        vip_credit: 0,
    };

    constructor(private modalService: TSModalService) { }

    close() {
        this.modalService.close();
    }

    dismiss() {
        this.modalService.dismiss();
    }
}
