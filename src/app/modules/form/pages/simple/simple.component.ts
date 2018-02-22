import { Component, OnInit } from '@angular/core';
import { TSModalService } from './../../../../tools-ui';
import { SimpleModalComponent } from './../../modal/simple-modal.component';

@Component({
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {

  // 表单数据
  formData = {
    title: 'Apple iPhone 8 Plus (A1864) 64GB 金色 移动联通电信4G手机',
    description: '',
    thumb: 'assets/image/avatar/2.jpg',
    images: 'assets/image/card/1.jpg,assets/image/card/2.jpg,assets/image/card/3.jpg,assets/image/card/4.jpg',
  };


  constructor(private modalService: TSModalService) { }

  ngOnInit() { }

  // 提交表单
  submit(btn: any) {

    setTimeout(_ => {
      // 表单提交结束，把按钮设置为就绪状态
      btn.complete = true;
    }, 2000);
  }

  // 弹出预览窗口
  preview() {
    const listener = this.modalService.create(SimpleModalComponent).open();
    listener.next(() => {

    });
  }

}
