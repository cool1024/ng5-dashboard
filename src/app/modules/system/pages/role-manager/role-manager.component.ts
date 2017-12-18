import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination, SearchParams } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';
import { TSSelectService, TSConfirmService, TSModalService, TSToastService } from './../../../../tools-ui';
import { RoleManagerModalComponent } from './role-manager.modal';
import { FormService } from '../../../../dashboard/services/form.service';

@Component({
    selector: 'app-role-manager',
    templateUrl: './role-manager.component.html',
    styleUrls: ['./role-manager.component.css']
})
export class RoleManagerComponent implements OnInit {


    @ViewChild('loading') flash: any;

    // 分页参数
    pagination = new Pagination();

    // 查询参数
    search = new SearchParams({ name: '' });

    // 表格数据
    list = new Array<{ id: number, name: string, description: string, permissions: string }>();

    // 表格标题
    theads = new Array<string>();

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
        this.theads = ['No.', '角色名称', '描述', '权限', '操作'];
        this.pageChanged();
    }

    // 换页事件(特别的更改每页数据量也会触发此事件)
    pageChanged() {
        this.flash.loading();
        this.request.get('/role/search', this.pagination.getpageDataWith(this.search.values), false).subscribe(res => {
            if (res.result) {
                this.list = res.datas.rows;
                this.pagination.total = res.datas.total;
            }
            this.flash.complete();
        });
    }

    // 搜索方法
    doSearch() {
        console.log(this.search.values);
    }

    // 重置搜索
    resetSearch() {
        this.search.clean();
        console.log(this.search.values);
    }

    // 删除确认
    deleteConfirm(index: number) {
        this.confirm.danger('确认删除', `您确定要删除角色${this.list[index].name}，操作不可回复！`, { okTitle: '确认', cancelTitle: '取消' })
            .next(() => {
                this.request.delete('/role/delete', { roleid: this.list[index].id }).subscribe(() => {
                    this.pageChanged();
                    this.toast.success('删除成功', '成功删除角色～');
                });
            });
    }

    // 弹出添加/编辑窗口
    showModal(index = -1) {
        this.modalService.create(RoleManagerModalComponent);
        if (index >= 0) {
            this.modalService.modal.instance.role = this.formService.jsonCopy(this.list[index]);
        }
        this.modalService.open().next(() => {
            this.pageChanged();
        });
    }

}
