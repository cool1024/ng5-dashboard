import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination, SearchParams } from './../../../../tools-ui';

const datas = [
  { id: 1, name: 'Hydrogen', description: '1.0079', created_at: 'H' },
  { id: 2, name: 'Helium', description: '4.0026', created_at: 'He' },
  { id: 3, name: 'Lithium', description: '6.941', created_at: 'Li' },
  { id: 4, name: 'Beryllium', description: '9.0122', created_at: 'Be' },
  { id: 5, name: 'Boron', description: '10.811', created_at: 'B' },
  { id: 6, name: 'Carbon', description: '12.0107', created_at: 'C' },
  { id: 7, name: 'Nitrogen', description: '14.0067', created_at: 'N' },
  { id: 8, name: 'Oxygen', description: '15.9994', created_at: 'O' },
  { id: 9, name: 'Fluorine', description: '18.9984', created_at: 'F' },
  { id: 10, name: 'Neon', description: '20.1797', created_at: 'Ne' },
  { id: 11, name: 'Sodium', description: '22.9897', created_at: 'Na' },
  { id: 12, name: 'Magnesium', description: '24.305', created_at: 'Mg' },
  { id: 13, name: 'Aluminum', description: '26.9815', created_at: 'Al' },
  { id: 14, name: 'Silicon', description: '28.0855', created_at: 'Si' },
  { id: 15, name: 'Phosphorus', description: '30.9738', created_at: 'P' },
  { id: 16, name: 'Sulfur', description: '32.065', created_at: 'S' },
  { id: 17, name: 'Chlorine', description: '35.453', created_at: 'Cl' },
  { id: 18, name: 'Argon', description: '39.948', created_at: 'Ar' },
  { id: 19, name: 'Potassium', description: '39.0983', created_at: 'K' },
  { id: 20, name: 'Calcium', description: '40.078', created_at: 'Ca' },
];
@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.css']
})
export class RoleManagerComponent implements OnInit {


  @ViewChild('loading') flash: any;

  // 分页参数
  pagination = new Pagination();

  // 查询参数
  search = new SearchParams({ name: '', start: '', end: '' });

  // 表格数据
  list = new Array<{ id: number, name: string, description: string, created_at: string }>();

  // 表格标题
  theads = new Array<string>();

  constructor() { }

  ngOnInit() {

    // 载入表格数据
    this.theads = ['No.', '角色名称', '创建日期', '描述', '操作'];
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
    console.log(this.search.params);
  }

  // 重置搜索
  resetSearch() {
    this.search.clean();
    console.log(this.search.values);
    console.log(this.search.params);
  }

}
