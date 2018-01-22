import { Component, OnInit, ViewChild } from '@angular/core';
import { VipUser } from './../../interfaces/vip-user';
import {
    SearchParams,
    Pagination,
    TSModalService,
    TSConfirmService,
    TSToastService,
} from '../../../../tools-ui';
import { HttpConfig } from '../../../../config/http.config';
import { RequestService } from '../../../../dashboard/services/request.service';
import { VipLevels } from './../../datas/vip-level.data';
import { VipGenders } from './../../datas/vip-genders.data';
import { NgModel } from '@angular/forms';
import { VipUserInfoModalComponent } from './vip-user-info-modal.component';

@Component({
    selector: 'app-vip-users',
    templateUrl: './vip-users.component.html',
    styleUrls: ['./vip-users.component.css']
})
export class VipUsersComponent implements OnInit {

    @ViewChild('loading') flash: any;

    // 分页参数
    pagination = new Pagination();
    // 查询参数
    search = new SearchParams({}, -1);
    // 表格标题
    theads = ['No.', '头像', '昵称', '电话', '性别', '等级', '积分', '操作'];
    // 资源地址
    source = HttpConfig.SOURCE_URL;
    // 会员列表
    list: VipUser[] = [];
    // 会员等级选项
    vip_levels = VipLevels;
    // 会员性别选项
    vip_genders = VipGenders;

    constructor(
        private request: RequestService,
        private modal: TSModalService,
        private confirm: TSConfirmService,
        private toast: TSToastService,
    ) { }

    ngOnInit() {
        this.pagination.limit = 20;
        this.pageChanged();
    }

    // 显示用户详情
    showUserInfoModal(id: number) {
        this.modal.create(VipUserInfoModalComponent);
        this.modal.modal.instance.user.id = id;
        this.modal.open().next(() => { this.pageChanged(); });
    }

    // 删除用户
    confirmDelete(user: VipUser) {
        this.confirm.danger('警告', `确认删除会员 ${user.nick} ,操作不可恢复?!`, { okTitle: '确认', cancelTitle: '取消' }).next(() => {
            this.request.delete('/vip/user/delete', { id: user.id }).subscribe(res => {
                this.toast.success('删除成功', `成功删除会员 ${user.nick}`);
                this.pageChanged();
            });
        });
    }

    // 用户充值
    showRechargeModal(id: number) {
        this.modal.create(VipUserInfoModalComponent);
        this.modal.modal.instance.user.id = id;
        this.modal.modal.instance.useRecharge = true;
        this.modal.open().next(() => { this.pageChanged(); });
    }

    // 换页事件(特别的更改每页数据量也会触发此事件)
    pageChanged() {
        this.flash.loading();
        this.request.get('/vip/user/search', this.pagination.getpageDataWith(this.search.values), false).subscribe(res => {
            if (res.result) {
                this.list = res.datas.rows;
                this.pagination.total = res.datas.total;
            }
            this.flash.complete();
        });
    }

    resetSearch() {
        this.search.clean();
        this.pagination.page = 1;
        this.pageChanged();
    }

    doSearch() {
        this.pagination.page = 1;
        this.pageChanged();
    }

    goPage(page: NgModel) {
        if (!isNaN(page.value) && page.value > 0 && page.value <= this.pagination.maxPage) {
            this.pagination.page = page.value;
            this.pageChanged();
        }
    }
}
