import { Component } from '@angular/core';
import {
    TSModalService,
    TSConfirmService,
    TSToastService,
    DefaultSmartConfig,
    TextRowConfig,
    AvatarDiyRowConfig,
    TextGroupConfig,
    DiyItemsConfig,
    ButtonsRowConfig,
    TdButton
} from '../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';
import { VipGenders } from './../../datas/vip-genders.data';
import { VipLevels } from './../../datas/vip-level.data';
import { VipUser } from '../../interfaces/vip-user';
import { VipUserInfoModalComponent } from './../vip-users/vip-user-info-modal.component';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-vip-users',
    templateUrl: './vip-users-smart.component.html',
})
export class VipUsersSmartComponent {

    config: DefaultSmartConfig;
    vip_genders = VipGenders;
    vip_levels = VipLevels;

    constructor(
        private request: RequestService,
        private modal: TSModalService,
        private confirm: TSConfirmService,
        private toast: TSToastService,
    ) {
        this.config = new DefaultSmartConfig();
        this.config.setLoad(request, '/vip/user/search');
        this.config.appendClass('table-bordered');
        this.config.appHeaders('No.', '用户', '联系方式', '地址', '等级（积分）', '操作');
        this.config.appendRows(
            new TextRowConfig('id'),
            new AvatarDiyRowConfig(['avatar', 'nick', 'gender'], [
                item => `${item}`,
                item => item === 0 ? `<small class="text-info"><i class="fa fa-mars fa-fw"></i>先生<small>` :
                    (item === 1 ? `<small class="text-danger"><i class="fa fa-mercury fa-fw"></i>女士<small>` :
                        `<small class="text-muted">未设置</small>`)
            ]),
            new TextGroupConfig(['phone', 'email']),
            new TextRowConfig('location'),
            new DiyItemsConfig(['vip_level', 'vip_credit'], items => `Lv.${items[0]}（积分：${items[1]}）`),
            new ButtonsRowConfig([
                new TdButton('详情', 'btn btn-sm btn-info', item => this.showUserInfoModal(item.id), 'fa fa-fw fa-info'),
                new TdButton('充值', 'btn btn-sm btn-primary', item => this.showRechargeModal(item.id), 'fa fa-fw fa-credit-card'),
                new TdButton('删除', 'btn btn-sm btn-danger', item => this.confirmDelete(item), 'fa fa-fw fa-remove'),
            ]),
        );
    }

    // 显示用户详情
    showUserInfoModal(id: number): Observable<void> {
        const sub = new Subject<void>();
        this.modal.create(VipUserInfoModalComponent);
        this.modal.modal.instance.user.id = id;
        this.modal.open().next(() => sub.next());
        return sub.asObservable();
    }

    // 删除用户
    confirmDelete(user: VipUser): Observable<void> {
        const sub = new Subject<void>();
        this.confirm.danger('警告', `确认删除会员 ${user.nick} ,操作不可恢复?!`, { okTitle: '确认', cancelTitle: '取消' }).next(() => {
            this.request.delete('/vip/user/delete', { id: user.id }).subscribe(res => {
                this.toast.success('删除成功', `成功删除会员 ${user.nick}`);
                sub.next();
            });
        });
        return sub.asObservable();
    }

    // 用户充值
    showRechargeModal(id: number): Observable<void> {
        const sub = new Subject<void>();
        this.modal.create(VipUserInfoModalComponent);
        this.modal.modal.instance.user.id = id;
        this.modal.modal.instance.useRecharge = true;
        this.modal.open().next(() => sub.next());
        return sub.asObservable();
    }
}
