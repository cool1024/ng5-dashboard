import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination, SearchParams } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';
import { TSSelectService, TSConfirmService, TSModalService, TSToastService } from './../../../../tools-ui';
import { AccountManagerModalComponent } from './account-manager.modal';
import { FormService } from '../../../../dashboard/services/form.service';

@Component({
    selector: 'app-account-manager',
    templateUrl: './account-manager.component.html',
    styleUrls: ['./account-manager.component.css']
})
export class AccountManagerComponent implements OnInit {

    @ViewChild('loading') flash: any;

    // 分页参数
    pagination = new Pagination();

    // 查询参数
    search = new SearchParams({ account: '', role_id: 0 });

    // 表格数据
    list = new Array<{ id: number, name: string, account: string, role: { id: number, name: string } }>();

    // 表格标题
    theads = new Array<string>();

    // 角色下拉选项列表
    roles = new Array<{ value: number, text: string }>();

    constructor(
        private request: RequestService,
        private selectService: TSSelectService,
        private confirm: TSConfirmService,
        private modalService: TSModalService,
        private formService: FormService,
        private toast: TSToastService
    ) { }

    ngOnInit() {

        // 载入表格数据
        this.theads = ['No.', '账号', '名称', '状态', '操作'];
        this.pageChanged();

        // 获取角色下拉列表
        this.request.url('/admin/roles').subscribe(res => {
            this.roles = this.selectService.formatSelectOptions(res.datas, { value: 'id', text: 'name' });
        });

    }

    // 换页事件(特别的更改每页数据量也会触发此事件)
    pageChanged() {
        this.flash.loading();
        this.request.get('/admin/search', this.pagination.getpageDataWith(this.search.values), false).subscribe(res => {
            if (res.result) {
                this.list = res.datas.rows;
                this.pagination.total = res.datas.total;
            }
            this.flash.complete();
        });
    }

    // 搜索方法
    doSearch() {
        this.pageChanged();
    }

    // 重置搜索
    resetSearch() {
        this.search.clean();
        this.pageChanged();
    }

    // 删除确认
    deleteConfirm(index: number) {
        this.confirm.danger('确认删除', `您确定要删除账户${this.list[index].account}，操作不可回复！`, { okTitle: '确认', cancelTitle: '取消' })
            .next(() => {
                this.request.delete('/admin/delete', { id: this.list[index].id }).subscribe(() => {
                    this.list.splice(index, 1);
                    this.toast.success('删除成功', '成功删除账号～');
                });
            });
    }

    // 弹出添加/编辑窗口
    showModal(index = -1) {
        this.modalService.create(AccountManagerModalComponent);
        if (index >= 0) {
            const admin = this.formService.jsonCopy(this.list[index]);
            admin.role = admin.role.id;
            this.modalService.modal.instance.admin = admin;
        }
        this.modalService.modal.instance.roles = this.roles;
        this.modalService.open().next(() => {
            this.pageChanged();
        });
    }
}
