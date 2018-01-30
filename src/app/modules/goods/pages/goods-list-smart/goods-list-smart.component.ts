import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import {
    TSConfirmService,
    TSSelectService,
    TextRowConfig,
    AvatarRowConfig,
    SpanRowConfig,
    DiyItemConfig,
    ButtonsRowConfig,
    TdButton,
    TdDropDown,
} from './../../../../tools-ui';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/filter';
import { RequestService } from '../../../../dashboard/services/request.service';
import { AppConfig } from '../../../../config/app.config';
import { HttpConfig } from '../../../../config/http.config';
import { ActivatedRoute, Router } from '@angular/router';
import { TSToastService } from '../../../../tools-ui';
import { DefaultSmartConfig } from '../../../../tools-ui/components/smart-table/smart-table.config';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    templateUrl: './goods-list-smart.component.html',
})
export class GoodsListSmartComponent implements OnInit {

    @ViewChild('table') table: any;

    // 表格配置参数
    config: DefaultSmartConfig;

    // 商品种类
    goods_types = [];

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
        private select: TSSelectService,
    ) {
        this.config = new DefaultSmartConfig();
        this.config.setLoad(request, '/goods/search');
        this.config.appendClass('table-bordered');
        this.config.appHeaders('No.', '图片', '商品名称', '种类', '单价', '库存', '状态', '操作');
        this.config.appendRows(
            new TextRowConfig('id'),
            new AvatarRowConfig('thumb', HttpConfig.SOURCE_URL + '/'),
            new TextRowConfig('name'),
            new DiyItemConfig('type', item => item.name),
            new TextRowConfig('price'),
            new TextRowConfig('inventory'),
            new SpanRowConfig('status', [0, 1], ['下架', '上架'], ['badge badge-pill badge-secondary', 'badge badge-pill badge-success']),
            new ButtonsRowConfig([
                new TdDropDown('状态', ['下架', '上架'], 'btn btn-sm btn-primary', [
                    item => this.changeGoodsStatus(item, 0),
                    item => this.changeGoodsStatus(item, 1),
                ], 'fa fa-pencil fa-fw'),
                new TdButton('详情', 'btn btn-sm btn-info',
                    item => { this.router.navigate(['/goods/list-smart/info/', item.id]); }, 'fa fa-fw fa-credit-card'),
                new TdButton('删除', 'btn btn-sm btn-danger', item => this.deleteItem(item), 'fa fa-fw fa-remove'),
            ]),
        );
    }

    ngOnInit() {
        // skip很重要，避免第一次进入页面请求两次
        this.activatedRoute.url
            .filter(() => this.router.url === '/goods/list-smart').skip(1)
            .subscribe(() => { this.table.pageChanged(); });
    }

    // 删除方法
    deleteItem(item: any): Observable<void> {
        const sub = new Subject<void>();
        this.confirm.danger('危险操作', `确认删除商品‘${item.name}’，操作不可恢复！`, { okTitle: '确认', cancelTitle: '取消' }).next(() => {
            this.request.delete('/goods/delete', { id: item.id }).subscribe(() => {
                this.toast.success('操作成功', '删除商品成功');
                sub.next();
            });
        });
        return sub.asObservable();
    }

    //  修改商品状态
    changeGoodsStatus(item: any, status: number) {
        this.request.put('/goods/update', { id: item.id, status }).subscribe(res => {
            item.status = status;
        });
    }

}
