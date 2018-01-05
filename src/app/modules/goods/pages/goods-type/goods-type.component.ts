import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from '../../../../dashboard/services/request.service';
import { TSToastService, TSConfirmService } from '../../../../tools-ui';
import { FormService } from '../../../../dashboard/services/form.service';

@Component({
    selector: 'app-goods-type',
    templateUrl: './goods-type.component.html',
    styleUrls: ['./goods-type.component.css']
})
export class GoodsTypeComponent implements OnInit {

    // 种类列表
    goods_type = new Array<{ id: number, name: string, active: boolean }>();
    @ViewChild('loading') flash: any;

    constructor(
        private request: RequestService,
        private toast: TSToastService,
        private confirm: TSConfirmService,
        private form: FormService,
    ) {

    }


    ngOnInit() {
        this.loadData();
    }

    // 载入种类
    loadData() {
        this.flash.loading();
        this.request.url('/goods/type/list').subscribe(res => {
            this.goods_type = res.datas;
            this.goods_type.forEach((type, i) => {
                this.goods_type[i].active = true;
                this.flash.complete();
            });
        });
    }

    // 保存类型
    saveType(i: number) {
        const type = this.goods_type[i];
        if (type.id > 0) {
            this.request.put('/goods/type/update', { id: type.id, name: type.name }).subscribe(res => {
                this.toast.success('修改成功', '种类修改成功');
                type.active = true;
            });
        } else {
            this.request.post('/goods/type/add', { name: type.name }).subscribe(res => {
                this.toast.success('添加成功', '种类添加成功');
                type.id = res.datas.id;
                type.active = true;
            });
        }
    }

    // 删除类型
    deleteType(i: number) {
        const type = this.goods_type[i];
        if (type.id > 0) {
            this.confirm.danger('危险操作', `确认删除种类‘${this.goods_type[i].name}’，操作不可恢复！`, { okTitle: '确认', cancelTitle: '取消' }).next(() => {
                this.request.delete('/goods/type/delete', { id: this.goods_type[i].id }).subscribe(() => {
                    this.toast.success('操作成功', '删除种类成功');
                    this.goods_type.splice(i, 1);
                });
            });
        } else {
            this.goods_type.splice(i, 1);
        }
    }

    // 添加类型
    addType() {
        this.goods_type.push({ id: 0, name: '新类型', active: false });
    }

    // 排序类型
    sortType() {
        this.request.put('/goods/type/sort', { ids: this.form.getIds(this.goods_type).join() }).subscribe(res => {
            this.toast.success('排序成功', '种类排序成功');
        });
    }

}
