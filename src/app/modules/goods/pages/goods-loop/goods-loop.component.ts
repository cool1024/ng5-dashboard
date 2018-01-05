import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../dashboard/services/request.service';
import { TSToastService, TSConfirmService, LoopCard, LoopCardObj, LoopCardArray } from '../../../../tools-ui';
import { HttpConfig } from '../../../../config/http.config';

@Component({
    selector: 'app-goods-loop',
    templateUrl: './goods-loop.component.html',
    styleUrls: ['./goods-loop.component.css']
})
export class GoodsLoopComponent implements OnInit {

    // 轮播图列表
    loopCards = new Array<LoopCardObj>();

    // 资源地址
    source = HttpConfig.SOURCE_URL + '/';

    constructor(
        private request: RequestService,
        private toast: TSToastService,
        private confirm: TSConfirmService
    ) {

    }

    ngOnInit() {
        this.loadData();
    }

    // 载入轮播图数据
    loadData() {
        this.request.url('/loops/list').subscribe(res => {
            this.loopCards = new LoopCardArray(res.datas).toArray();
        });
    }

    // 添加轮播图
    addLoopCard() {
        this.loopCards.push(new LoopCardObj());
    }

    // 排序轮播图
    sortLoopCard() {
        const ids = [];
        this.loopCards.forEach(loopCard => {
            // 只有保存过的轮播图才会参与排序（有ID的）
            if (loopCard.id > 0) {
                ids.push(loopCard.id);
            }
        });
        this.request.put('/loops/sort', { ids: ids.join() }).subscribe(res => {
            this.toast.success('排序成功', '排序幻灯片成功～');
        });
    }

    // 保存轮播图
    saveLoopCard(i: number) {
        const loopCard = this.loopCards[i];
        if (loopCard.id > 0) {
            // 调用修改接口
            const files = [];
            // 如果需要上传图片
            if (loopCard.file) {
                files.push({ name: 'src', files: [loopCard.file] });
            }
            this.request.files('/loops/update', { id: loopCard.id, url: loopCard.url }, files).subscribe(res => {
                loopCard.id = res.datas.id;
                loopCard.src = res.datas.src;
                loopCard.setActive();
                this.toast.success('修改成功', '修改幻灯片成功～');
            });
        } else {
            // 调用添加接口
            this.request.files('/loops/add', { url: loopCard.url }, [{ name: 'src', files: [loopCard.file] }]).subscribe(res => {
                loopCard.id = res.datas.id;
                loopCard.src = res.datas.src;
                loopCard.setActive();
                this.toast.success('添加成功', '添加幻灯片成功～');
            });
        }
    }

    // 删除轮播图
    deleteLoopCard(i: number) {
        if (this.loopCards[i].id > 0) {
            // 调用删除接口
            this.confirm.danger('危险操作', `确认删除幻灯片‘${this.loopCards[i].url}’，操作不可恢复！`, { okTitle: '确认', cancelTitle: '取消' }).next(() => {
                this.request.delete('/loops/delete', { id: this.loopCards[i].id }).subscribe(() => {
                    this.toast.success('操作成功', '删除幻灯片成功');
                    this.loopCards.splice(i, 1);
                });
            });
        } else {
            // 本地删除即可
            this.loopCards.splice(i, 1);
        }
    }

}
