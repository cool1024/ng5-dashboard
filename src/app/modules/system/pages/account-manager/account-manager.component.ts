import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination, SearchParams } from './../../../../tools-ui';

const datas = [
  { id: 1, name: 'Hydrogen', account: '1.0079', role: 'H' },
  { id: 2, name: 'Helium', account: '4.0026', role: 'He' },
  { id: 3, name: 'Lithium', account: '6.941', role: 'Li' },
  { id: 4, name: 'Beryllium', account: '9.0122', role: 'Be' },
  { id: 5, name: 'Boron', account: '10.811', role: 'B' },
  { id: 6, name: 'Carbon', account: '12.0107', role: 'C' },
  { id: 7, name: 'Nitrogen', account: '14.0067', role: 'N' },
  { id: 8, name: 'Oxygen', account: '15.9994', role: 'O' },
  { id: 9, name: 'Fluorine', account: '18.9984', role: 'F' },
  { id: 10, name: 'Neon', account: '20.1797', role: 'Ne' },
  { id: 11, name: 'Sodium', account: '22.9897', role: 'Na' },
  { id: 12, name: 'Magnesium', account: '24.305', role: 'Mg' },
  { id: 13, name: 'Aluminum', account: '26.9815', role: 'Al' },
  { id: 14, name: 'Silicon', account: '28.0855', role: 'Si' },
  { id: 15, name: 'Phosphorus', account: '30.9738', role: 'P' },
  { id: 16, name: 'Sulfur', account: '32.065', role: 'S' },
  { id: 17, name: 'Chlorine', account: '35.453', role: 'Cl' },
  { id: 18, name: 'Argon', account: '39.948', role: 'Ar' },
  { id: 19, name: 'Potassium', account: '39.0983', role: 'K' },
  { id: 20, name: 'Calcium', account: '40.078', role: 'Ca' },
];

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css']
})
export class AccountManagerComponent implements OnInit {

  @ViewChild('loading') flash: any;

  // 分页参数
  pagination = new Pagination();

  // 查询参数
  search = new SearchParams({ name: '', start: null, end: null });

  // 表格数据
  list = new Array<{ id: number, name: string, account: string, role: string }>();

  // 表格标题
  theads = new Array<string>();

  ngOnInit() {

    // 载入表格数据
    this.theads = ['No.', '账号', '名称', '角色', '操作'];
    this.list = datas.slice(0, this.pagination.limit);

    // 分页组件配置
    this.pagination.total = datas.length;
  }

  // 换页事件(特别的更改每页数据量也会触发此事件)
  pageChanged() {
    this.flash.loading();

    // 模拟数据加载过程
    setTimeout(() => {
      this.list = datas.slice(this.pagination.offset, this.pagination.offset + this.pagination.limit);
      this.flash.complete();
    }, 1000);

  }

  // 搜索方法
  doSearch() {
    console.log(this.search.values);
  }

  // 重置搜索
  resetSearch() {
    this.search.clean();
    console.log(this.search.values);
  }

}
