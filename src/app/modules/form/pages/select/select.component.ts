import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

    // 下拉选择数据
    selects = [
        { text: 'Apple', value: 1 },
        { text: 'Banana', value: 2 },
        { text: 'Carota', value: 3 },
        { text: 'Dinner ', value: 4 },
    ];

    // 一级菜单
    parentSelects = [
        { text: 'Fruit', value: 1 },
        { text: 'Other', value: 2 },
    ];

    // 二级菜单
    get childSelects(): Array<{ text: string, value: number, parentId: number }> {
        const childSelects = [
            { text: 'Apple', value: 1, parentId: 1 },
            { text: 'Banana', value: 2, parentId: 1 },
            { text: 'Orange', value: 3, parentId: 1 },
            { text: 'Cup', value: 4, parentId: 2 },
            { text: 'Paper', value: 5, parentId: 2 },
        ];
        return childSelects.filter(child => child.parentId === this.parentId);

    }

    // 选中的一级菜单
    parentId = 1;

    // 选中的二级菜单
    childId = 1;

    selectValue1 = 'Amsterdam';
    selectValue2 = 2;
    selectValue3 = 0;
    constructor() { }

    ngOnInit() { }

}
