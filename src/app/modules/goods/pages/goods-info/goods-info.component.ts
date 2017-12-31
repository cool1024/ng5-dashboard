import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-goods-info',
  templateUrl: './goods-info.component.html',
  styleUrls: ['./goods-info.component.css']
})
export class GoodsInfoComponent implements OnInit {

  // 响应式表单
  goodsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() { }

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
