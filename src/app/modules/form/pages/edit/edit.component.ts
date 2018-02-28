/**
 * 编辑器组件 EditComponent
 *
 * @file    edit.component.ts
 * @author  xiaojian
 * @date    2018年02月26日
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

    // 模板数据
    formJson = '[{\"type\":4,\"title\":\"下拉选项\",\"placeholder\":\"请选择选项\",\"active\":true,\"required\":false,\"defaultValue\":1,\"options\":[\"选项一\",\"选项二\"]},{\"type\":3,\"title\":\"日期\",\"placeholder\":\"请输入日期\",\"active\":false,\"required\":false,\"dateType\":\"date\"},{\"type\":8,\"title\":\"图片\",\"placeholder\":\"请输入文本内容\",\"active\":false,\"required\":false,\"fileType\":\"image\",\"multiple\":false},{\"type\":8,\"title\":\"附件\",\"placeholder\":\"请输入文本内容\",\"active\":false,\"required\":false,\"fileType\":\"file\",\"multiple\":false},{\"type\":0,\"title\":\"密文\",\"placeholder\":\"请输入密文\",\"active\":false,\"required\":false,\"inputType\":\"password\",\"ranges\":[\"\",\"\"]},{\"type\":2,\"title\":\"默认标题\",\"placeholder\":\"请输入文本内容\",\"active\":false,\"required\":false,\"textAreaType\":\"base\",\"ranges\":[0,100]},{\"type\":6,\"title\":\"主标题\",\"placeholder\":\"请输入文本内容\",\"active\":false,\"required\":false,\"subject\":\"副标题\"},{\"type\":0,\"title\":\"数字\",\"placeholder\":\"请输入一个数字\",\"active\":false,\"required\":false,\"inputType\":\"number\",\"ranges\":[\"\",\"\"]},{\"type\":0,\"title\":\"单行文本\",\"placeholder\":\"请输入文字\",\"active\":false,\"required\":false,\"inputType\":\"text\",\"ranges\":[\"\",\"\"]}]';

    constructor() {
    }

    ngOnInit() {

    }
}
