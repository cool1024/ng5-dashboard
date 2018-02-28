/**
 * 组件文件
 * FileFieldEditComponent
 *
 * @file file-field-edit.compont.ts
 * @author xiaojian
 * @date 2018年02月27日
 */
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FileTypes, FileControlField } from './file.class';

@Component({
    selector: 'ts-form-edit-file',
    templateUrl: './file-field-edit.component.html',
})
export class FileFieldEditComponent implements OnInit {


    @Input() field: FileControlField;
    @Output() fieldChange = new EventEmitter<FileControlField>(false);

    // File类型列表
    fileTypes = FileTypes;


    constructor() {
        this.field = new FileControlField();
    }

    ngOnInit() { }
}
