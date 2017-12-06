import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './loop-card.component.html',
  styleUrls: ['./loop-card.component.css']
})
export class LoopCardComponent implements OnInit {

  // 轮播图列表
  loopCards = new Array<{ id: number, url: string, src: string, active?: boolean, file?: File }>();

  constructor() { }

  ngOnInit() {

    // 获取轮播图列表
    this.loopCards = [
      { id: 1, url: '1', src: 'http://127.0.0.1:4200/assets/image/card/1.jpg', active: true },
      { id: 2, url: '2', src: 'http://127.0.0.1:4200/assets/image/card/2.jpg', active: true },
      { id: 3, url: '3', src: 'http://127.0.0.1:4200/assets/image/card/3.jpg', active: true },
    ];
  }

  // 添加轮播图
  addLoopCard() {
    this.loopCards.push({ id: 0, url: '', src: '' });
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
    console.log(ids);
  }

  // 保存轮播图
  saveLoopCard(i: number) {
    if (this.loopCards[i].id > 0) {
      // 调用修改接口
      console.log(this.loopCards[i].id);

      // 如果需要上传图片
      if (this.loopCards[i].file) {

        // this.loopCards[i].src = 'http://...';
      }

      // 修改成功后设为积极状态
      this.loopCards[i].active = true;
    } else {
      // 调用添加接口

      // 添加成功后获取轮播图ID和图片地址,并设置为积极状态
      this.loopCards[i].id = 1;
      // this.loopCards[i].src = 'http://...';
      this.loopCards[i].active = true;
      this.loopCards[i].file = null;
    }
  }

  // 删除轮播图
  deleteLoopCard(i: number) {
    if (this.loopCards[i].id > 0) {
      // 调用删除接口
      console.log(this.loopCards[i].id);

      this.loopCards.splice(i, 1);
    } else {
      // 本地删除即可
      this.loopCards.splice(i, 1);
    }
  }
}
