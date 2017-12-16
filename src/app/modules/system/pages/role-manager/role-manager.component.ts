import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination, SearchParams } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';

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
    search = new SearchParams({ name: '', account: '', start: null, end: null });

    // 表格数据
    list = new Array<{ id: number, name: string, description: string, created_at: string }>();

    // 表格标题
    theads = new Array<string>();

    constructor(private requestService: RequestService) { }

    ngOnInit() {

        // 载入表格数据
        this.theads = ['No.', '角色名称', '描述', '创建日期', '操作'];
        this.pageChanged();
    }

    // 换页事件(特别的更改每页数据量也会触发此事件)
    pageChanged() {
        this.flash.loading();
        this.requestService.get('/role/search', this.pagination.getpageDataWith(this.search.values), false).subscribe(res => {
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

}
