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
    selector: 'app-goods-type',
    templateUrl: './goods-type.component.html',
    styleUrls: ['./goods-type.component.css']
})
export class GoodsTypeComponent implements OnInit {

    // 种类列表
    goods_type = [
        { id: 1, name: '零食' },
        { id: 2, name: '餐具' },
        { id: 3, name: '电子产品' },
        { id: 4, name: '无线设备' }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private request: RequestService,
        private toast: TSToastService,
        private form: FormService
    ) {

    }


    ngOnInit() {

    }

}
