import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RequestService } from '../../../../dashboard/services/request.service';
import { TSToastService, ImageConfig, UploadResult } from '../../../../tools-ui';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApiData } from '../../../../dashboard/classes/api.class';
import { HttpConfig } from '../../../../config/http.config';
import { FormService } from '../../../../dashboard/services/form.service';

@Component({
    selector: 'app-goods-info',
    templateUrl: './goods-info.component.html',
    styleUrls: ['./goods-info.component.css']
})
export class GoodsInfoComponent implements OnInit {

    // 响应式表单
    goodsForm: FormGroup;

    // 商品数据
    goods = {
        id: 0,
        name: '',
        no: '',
        price: '',
        inventory: '',
        type: 1,
        status: 0,
        thumb: '',
    };

    // 商品种类
    goods_types = [
        { value: 1, text: '零食' },
        { value: 2, text: '餐具' },
        { value: 3, text: '电子产品' },
        { value: 4, text: '无线设备' },
    ];

    // 自动上传配置
    autpUploadConfig: ImageConfig = {
        uploadeFunc: file => {
            return this.request.files('/goods/thumb/upload ', {}, [{ name: 'thumb', files: [file] }])
                .switchMap(res =>
                    Observable.of<UploadResult>({
                        source: res.datas,
                        result: true,
                        message: '上传成功'
                    })
                );
        },
        source: HttpConfig.SOURCE_URL + '/',
        useUploader: true,
        auto: true
    };

    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private request: RequestService,
        private toast: TSToastService,
        private form: FormService
    ) {
        this.createForm();
    }


    ngOnInit() {
        this.activatedRoute.paramMap
            .skipWhile(params => !params.has('id'))
            .switchMap(params => this.request.get('/goods/info', { id: params.get('id') }))
            .subscribe(res => {
                this.goods = res.datas;
                this.setForm();
            });
    }

    // 创建FormGroup
    createForm() {
        this.goodsForm = this.formBuilder.group({
            name: ['', Validators.required],
            no: ['', [Validators.required, Validators.maxLength(20)]],
            price: ['', [Validators.required, Validators.pattern(/^(0|([1-9]\d{0,9}(\.\d{1,2})?))$/)]],
            inventory: ['', [Validators.required, Validators.min(0), Validators.max(99999)]],
        });
    }

    // 设置初始值
    setForm() {
        this.goodsForm.patchValue({
            name: this.goods.name,
            no: this.goods.no,
            price: this.goods.price,
            inventory: this.goods.inventory,
        });
    }

    // 修改商品
    confirmChange(btn: any) {
        const formValue = this.form.combineFormDatas(this.goods, this.goodsForm.value);
        this.request.put('/goods/update', formValue, false).subscribe(res => {
            if (res.result) { this.toast.success('操作成功', '商品信息修改成功～'); }
            btn.ready();
        });
    }

    // 添加商品
    confirmAdd(btn: any) {
        const formValue = this.form.combineFormDatas(this.goods, this.goodsForm.value);
        this.request.post('/goods/add', formValue, false).subscribe(res => {
            if (res.result) { this.toast.success('操作成功', '商品添加成功～'); }
            btn.ready();
        });
    }
}
