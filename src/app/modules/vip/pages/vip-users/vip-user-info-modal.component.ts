import { Component, OnInit } from '@angular/core';
import { TSModalService, TSToastService } from './../../../../tools-ui';
import { VipUser } from '../../interfaces/vip-user';
import { RequestService } from '../../../../dashboard/services/request.service';
import { HttpConfig } from '../../../../config/http.config';

@Component({
    template: `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
                <img *ngIf="!loading;else text_pad" class="rounded-circle" [src]="source+user.avatar" height="25">
                <ng-template #text_pad>@用户详情</ng-template>
            </h5>
            <span  class="close pointer" (click)="dismiss()">
                &times;
            </span>
        </div>
        <div class="modal-body" style="overflow:auto">
            <ts-load-css *ngIf="loading;else form_pad" borderClass="border-info"></ts-load-css>
            <ng-template #form_pad>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">昵称</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" [(ngModel)]="user.nick">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">电话</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" [(ngModel)]="user.phone">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">性别</label>
                    <div class="col-sm-5">
                        <div class="form-control border-0">
                            <ts-radio-group [(value)]="user.gender">
                                <ts-radio [value]="0" label="先生" color="info"></ts-radio>
                                <ts-radio [value]="1" label="女士" color="danger"></ts-radio>
                            </ts-radio-group>
                        </div>
                    </div>
                    <label class="col-sm-2 col-form-label">等级</label>
                    <div class="col-sm-3">
                        <input type="text" disabled class="form-control" [value]="'Lv.'+user.vip_level">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">积分</label>
                    <div class="col-sm-10">
                        <input type="text" disabled class="form-control" [value]="user.vip_level">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label pr-0">创建日期</label>
                    <div class="col-sm-10">
                        <input type="text" disabled class="form-control" [value]="user.created_at">
                    </div>
                </div>
            </ng-template>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-white" (click)="dismiss()">关闭窗口</button>
            <button type="button" #btnSubmit="tsLoading" ts-loading title="确认修改"
                 [disabled]="loading" class="btn btn-success" (click)="confirmSubmit(btnSubmit)"></button>
        </div>`,
})
export class VipUserInfoModalComponent implements OnInit {

    // 用户信息
    user: VipUser = {
        id: 0,
        nick: '',
        avatar: '',
        vip_level: 0,
        vip_credit: 0,
    };
    // 数据是否在加载
    loading = true;
    // 图片资源地址源地址
    source = '';
    // source = HttpConfig.SOURCE_URL + '/';

    constructor(
        private modal: TSModalService,
        private reqeust: RequestService,
        private toast: TSToastService,
    ) { }

    ngOnInit() {
        this.reqeust.get('/vip/user/info', { id: this.user.id }).subscribe(res => {
            this.user = res.datas;
            this.loading = false;
        });
    }

    confirmSubmit(btnSubmit: any) {
        this.reqeust.put('/vip/user/update', <{ [key: string]: any }>this.user, false).subscribe(res => {
            if (res.result) {
                this.toast.success('修改成功', '成功修改用户信息~');
                this.close();
            }
            btnSubmit.ready();
        });
    }

    close() {
        this.modal.close();
    }

    dismiss() {
        this.modal.dismiss();
    }
}
