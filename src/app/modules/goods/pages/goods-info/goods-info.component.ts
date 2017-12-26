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
      goods_type: [0, [Validators.required, Validators.maxLength(8)]],
      price: ['', Validators.required],
      size: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      weight: ['', Validators.required],
    });
  }
  // createForm() {
  //   this.mutiForm = this.formBuilder.group({
  //     _name: ['', Validators.required],
  //     _no: ['', [Validators.required, Validators.maxLength(8)]],
  //     _address: ['', Validators.required],
  //     _size: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
  //     _weight: ['', Validators.required],
  //   });
  // }
}
