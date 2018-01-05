import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Pagination, SearchParams, TSConfirmService } from './../../../../tools-ui';
import { RouterOutlet } from '@angular/router';

const datas = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', thumb: 'http://placekitten.com/200/350' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', thumb: 'http://placekitten.com/150/150' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', thumb: 'http://placekitten.com/250/300' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', thumb: 'http://placekitten.com/450/300' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', thumb: 'http://placekitten.com/250/350' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', thumb: 'http://placekitten.com/200/300' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', thumb: 'http://placekitten.com/200/300' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', thumb: 'http://placekitten.com/200/300' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', thumb: 'http://placekitten.com/200/300' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', thumb: 'http://placekitten.com/200/300' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', thumb: 'http://placekitten.com/200/300' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', thumb: 'http://placekitten.com/200/300' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', thumb: 'http://placekitten.com/200/300' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', thumb: 'http://placekitten.com/200/300' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', thumb: 'http://placekitten.com/200/300' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', thumb: 'http://placekitten.com/200/300' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', thumb: 'http://placekitten.com/200/300' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', thumb: 'http://placekitten.com/200/300' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', thumb: 'http://placekitten.com/200/300' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', thumb: 'http://placekitten.com/200/300' },
];

@Component({
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {

    @ViewChild('loading') flash: any;
    @ViewChild(RouterOutlet) outlet: any;

    // 分页参数
    pagination = new Pagination();

    // 查询参数
    search = new SearchParams({ name: '', start: '', end: '' });

    // 表格数据
    list = new Array<{ position: number, name: string, weight: number, symbol: string, thumb: string, }>();

    // 表格标题
    theads = new Array<string>();

    constructor(private confirm: TSConfirmService) { }

    ngOnInit() {

        // 载入表格数据
        this.theads = ['No.', '图片', '名称', '质量', '符号', '操作'];
        this.pageChanged();
    }

    // 删除方法
    deleteItem(i: number) {
        this.confirm.danger('危险操作', `确认删除 ${this.list[i].name} ，操作不可恢复！`, { okTitle: '确认', cancelTitle: '取消' }).next(() => {
            const index = datas.indexOf(this.list[i]);
            if (index >= 0) { datas.splice(index, 1); }
            this.pageChanged();
        });
    }

    // 换页事件(特别的更改每页数据量也会触发此事件)
    pageChanged() {
        this.flash.loading();

        // 模拟数据加载过程
        setTimeout(() => {
            this.list = datas.slice(this.pagination.offset, this.pagination.offset + this.pagination.limit);
            this.pagination.total = datas.length;
            this.flash.complete();
        }, 1000);

    }

    // 跳转页面
    goPage(page: NgModel) {
        if (!isNaN(page.value) && page.value > 0 && page.value <= this.pagination.maxPage) {
            this.pagination.page = page.value;
            this.pageChanged();
        }
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
