import { Component, EventEmitter, Input, Output, DoCheck, /*OnInit*/ } from '@angular/core';
import { Pagination } from './../../classes/pagination.class';
@Component({
  selector: 'ts-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements /*OnInit*/ DoCheck {


  @Input() nextTitle: string;

  @Input() prevTitle: string;

  @Input() endTitle: string;

  @Input() startTitle: string;

  @Input() pagination: Pagination;

  @Input() btnNum: number;

  @Input() colors: string;

  @Output() pageChange = new EventEmitter<Pagination>();

  pages: number[];

  constructor() {

    this.btnNum = 5;

    this.colors = 'btn-primary';

    this.pagination = new Pagination();
  }

  // 一般分页使用此 生命周期函数
  // ngOnInit() { this.setPages(); }

  // 需要实时同步分页参数使用此生命周期函数
  ngDoCheck() { this.setPages(); }


  sendChange() {
    this.setPages();
    this.pageChange.emit(this.pagination);
  }

  setPages() {
    this.pages = [];
    const pagination = this.pagination.clone();
    let right = 0;
    let left = 0;
    const maxLeftNum = pagination.page - 1;
    let maxRightNum = pagination.maxPage - pagination.page;
    maxRightNum = maxRightNum > 0 ? maxRightNum : 0;
    const expLeftNum = Math.ceil((this.btnNum - 1) / 2);
    const expRightNum = this.btnNum - expLeftNum - 1;
    if (maxLeftNum >= expLeftNum) {
      if (maxRightNum >= expRightNum) {
        left = expLeftNum;
        right = expRightNum;
      } else {
        right = maxRightNum;
        left = maxLeftNum > (this.btnNum - right - 1) ? this.btnNum - right - 1 : maxLeftNum;
      }
    } else {
      if (maxRightNum >= expRightNum) {
        left = maxLeftNum;
        right = maxRightNum > (this.btnNum - left - 1) ? this.btnNum - left - 1 : maxRightNum;
      } else {
        left = maxLeftNum;
        right = maxRightNum;
      }
    }

    for (let i = 0; i < left; i++) {
      this.pages.push(pagination.page - left + i);
    }
    this.pages.push(pagination.page);
    for (let i = 0; i < right; i++) {
      this.pages.push(pagination.page + i + 1);
    }
  }

  get theme(): { start: string, prev: string, page: string, next: string, end: string } {

    const theme = {
      start: 'btn-outline-secondary',
      prev: 'btn-outline-secondary',
      page: 'btn-outline-secondary',
      next: 'btn-outline-secondary',
      end: 'btn-outline-secondary',
    };

    try {
      const colors = this.colors.split(',');
      if (colors.length === 1) {
        theme.page = theme.start = theme.prev = theme.next = theme.end = colors[0];
      } else if (colors.length === 2) {
        theme.start = theme.prev = theme.next = theme.end = colors[0];
        theme.page = colors[1];
      } else if (colors.length === 3) {
        theme.start = theme.prev = colors[0];
        theme.page = colors[1];
        theme.next = theme.end = colors[2];
      } else if (colors.length === 5) {
        theme.start = colors[0];
        theme.prev = colors[1];
        theme.page = colors[2];
        theme.next = colors[3];
        theme.end = colors[4];
      }
      return theme;

    } catch (e) {
      console.error(e);
      console.error('pagination : your colors string was wrong');
      return theme;
    }
  }

}
