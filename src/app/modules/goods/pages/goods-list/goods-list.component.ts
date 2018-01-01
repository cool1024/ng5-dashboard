import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination, SearchParams, TSConfirmService } from './../../../../tools-ui';
import { RouterOutlet } from '@angular/router';

@Component({
    templateUrl: './goods-list.component.html',
    styleUrls: ['./goods-list.component.css']
})
export class GoodsListComponent implements OnInit {

    @ViewChild('loading') flash: any;
    @ViewChild(RouterOutlet) outlet: any;

    // 分页参数
    pagination = new Pagination();

    // 查询参数
    search = new SearchParams({ name: '', type: '', status: '' });

    // 表格数据
    list = new Array<{ position: number, name: string, weight: number, symbol: string, thumb: string, }>();

    // 表格标题
    theads = new Array<string>();

    constructor(private confirm: TSConfirmService) { }

    ngOnInit() {

        // 载入表格数据
        this.theads = ['No.', '商品名称', '单价', '库存', '状态', '操作'];
        this.pageChanged();
    }

    // 删除方法
    deleteItem(i: number) {
        this.confirm.danger('危险操作', `确认删除 ${this.list[i].name} ，操作不可恢复！`, { okTitle: '确认', cancelTitle: '取消' }).next(() => {
            this.pageChanged();
        });
    }

    // 换页事件(特别的更改每页数据量也会触发此事件)
    pageChanged() {
        this.flash.loading();

        // 模拟数据加载过程
        setTimeout(() => {
            this.flash.complete();
        }, 1000);

    }

    // 搜索方法
    doSearch() {
        console.log(this.search.values);
        console.log(this.search.params);
    }

    // 重置搜索
    resetSearch() {
        this.search.clean();
        console.log(this.search.values);
        console.log(this.search.params);
    }
}
