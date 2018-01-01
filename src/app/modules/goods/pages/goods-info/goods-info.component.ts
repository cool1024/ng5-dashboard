import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RequestService } from '../../../../dashboard/services/request.service';
import { TSToastService } from '../../../../tools-ui';

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
        goods_name: '',
        goods_no: '',
        price: '',
        inventory: '',
        goods_type: '',
    };

    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private request: RequestService,
        private toast: TSToastService) {
        this.createForm();
    }


    ngOnInit() {
        this.activatedRoute.paramMap
            .switchMap(params => this.request.get('/goods/info', { id: params.get('id') }))
            .subscribe(res => {
                this.goods = res.datas;
            });
        this.goodsForm.patchValue({
            goods_name: this.goods.goods_name,
            goods_no: this.goods.goods_no,
            price: this.goods.price,
            inventory: this.goods.inventory,
        });
    }

    // 创建FormGroup
    createForm() {
        this.goodsForm = this.formBuilder.group({
            goods_name: ['', Validators.required],
            goods_no: ['', [Validators.required, Validators.maxLength(8)]],
            price: ['', [Validators.required, Validators.pattern(/^(0|([1-9]\d{0,9}(\.\d{1,2})?))$/)]],
            inventory: ['', [Validators.required, Validators.min(0), Validators.max(99999)]],
        });
    }
}
