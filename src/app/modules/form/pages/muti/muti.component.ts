import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mutiAsyncValidatorFn } from './muti.validator';
@Component({
    selector: 'app-muti',
    templateUrl: './muti.component.html',
    styleUrls: ['./muti.component.css']
})
export class MutiComponent implements OnInit {

    // 表单数据
    datas = {
        name: '',
        no: '',
        address: '',
        size: '',
        weight: ''
    };

    // 响应式表单
    mutiForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.createForm();
    }

    ngOnInit() { }

    // 创建FormGroup
    createForm() {
        this.mutiForm = this.formBuilder.group({
            _name: ['', Validators.required],
            _no: ['', [Validators.required, Validators.maxLength(8)]],
            _address: ['', Validators.required],
            _size: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
            _weight: ['', Validators.required, mutiAsyncValidatorFn()],
        });
    }

}
