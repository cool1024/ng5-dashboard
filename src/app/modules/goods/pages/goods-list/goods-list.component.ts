import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination, SearchParams, TSConfirmService } from './../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';
import { AppConfig } from '../../../../config/app.config';
import { HttpConfig } from '../../../../config/http.config';
import { ActivatedRoute, Router } from '@angular/router';
import { TSToastService } from '../../../../tools-ui';

@Component({
    templateUrl: './goods-list.component.html',
    styleUrls: ['./goods-list.component.css']
})
export class GoodsListComponent implements OnInit {

    @ViewChild('loading') flash: any;

    // 分页参数
    pagination = new Pagination();

    // 查询参数
    search = new SearchParams({ name: '', type: '', status: -1 }, -1);

    // 表格数据
    list = new Array<{ id: number, no: string, name: string, price: number, inventory: number, thumb: string, status: number }>();

    // 表格标题
    theads = new Array<string>();

    // 资源地址
    source = HttpConfig.SOURCE_URL;

    // 商品种类
    goods_types = [
        { value: 1, text: '零食' },
        { value: 2, text: '餐具' },
        { value: 3, text: '电子产品' },
        { value: 4, text: '无线设备' },
    ];

    // 商品状态
    goods_status = [
        { value: 0, text: '下架' },
        { value: 1, text: '上架' },
    ];

    constructor(
        private confirm: TSConfirmService,
        private request: RequestService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: TSToastService,
    ) { }

    ngOnInit() {
        this.theads = ['No.', '图片', '商品名称', '单价', '库存', '状态', '操作'];
        this.activatedRoute.url.subscribe(() => {
            if (this.router.url === '/goods/list') {
                this.pageChanged();
            }
        });
    }

    // 删除方法
    deleteItem(i: number) {
        this.confirm.danger('危险操作', `确认删除商品‘${this.list[i].name}’，操作不可恢复！`, { okTitle: '确认', cancelTitle: '取消' }).next(() => {
            this.request.delete('/goods/delete', { id: this.list[i].id }).subscribe(() => {
                this.pageChanged();
                this.toast.success('操作成功', '删除商品成功');
            });
        });
    }

    // 换页事件(特别的更改每页数据量也会触发此事件)
    pageChanged() {
        this.flash.loading();
        this.request.get('/goods/search', this.pagination.getpageDataWith(this.search.values), false).subscribe(res => {
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

    // 修改商品状态
    changeGoodsStatus(index: number, status: number) {
        this.request.put('/goods/update', { id: this.list[index].id, status }).subscribe(res => {
            this.list[index].status = status;
        });
    }

}
