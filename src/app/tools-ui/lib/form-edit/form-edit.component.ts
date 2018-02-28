/**
 * 编辑器组件 EditComponent
 *
 * @file    edit.component.ts
 * @author  xiaojian
 * @date    2018年02月26日
 */

import { Component, ViewChild } from '@angular/core';
import { EditControlField, ControlType } from './classes/edit.class';
import { FormConfig } from './classes/form.class';
import { ControlTypes } from './datas/control.datas';
import { InputControlField, InputType } from './components/input-field/input.class';
import { TextAreaControlField, TextAreaType } from './components/textarea-field/textarea.class';
import { SelectControlField } from './components/select-field/select.class';
import { RadioControlField } from './components/radio-field/radio.class';
import { TextControlField } from './components/text-field/text.class';
import { DateControlField, DateType } from './components/date-field/date.class';
import { FileControlField, FileType } from './components/file-field/file.class';

@Component({
    selector: 'ts-form-edit',
    templateUrl: './form-edit.component.html',
    styleUrls: ['./form-edit.component.css'],
    exportAs: 'tsFormEdit',
})
export class FormEditComponent {

    // Tab切换面板
    @ViewChild('toolTab') toolTab: any;

    // 编辑器当前组件列表
    controls: EditControlField[];

    // 当前处于编辑状态下的组件
    activeField: EditControlField;

    // 控件类型枚举
    controlType = ControlType;

    // 控件详细列表
    controlTypes = ControlTypes;

    // 表单配置信息
    formConfig: FormConfig;

    constructor() {
        this.controls = [];
        this.formConfig = { title: '表单名称', subject: '表单描述信息' };
    }

    /**
     * 添加新控件
     *
     * @param  controlType string 控件类型
     * @return void
     */
    addFiled(controlType: ControlType, type: string) {
        switch (controlType) {
            case ControlType.DEFAULT_INPUT: {
                const field = new InputControlField();
                field.setType(<InputType>type);
                this.controls.push(field);
                break;
            }
            case ControlType.TEXTAREA: {
                const field = new TextAreaControlField();
                field.textAreaType = <TextAreaType>type;
                this.controls.push(field);
                break;
            }
            case ControlType.SELECT: {
                const field = new SelectControlField();
                this.controls.push(field);
                break;
            }
            case ControlType.RADIO: {
                const field = new RadioControlField();
                this.controls.push(field);
                break;
            }
            case ControlType.TEXT: {
                const field = new TextControlField();
                this.controls.push(field);
                break;
            }
            case ControlType.DATE: {
                const field = new DateControlField();
                field.setType(<DateType>type);
                this.controls.push(field);
                break;
            }
            case ControlType.FILE: {
                console.log('file');
                const field = new FileControlField();
                field.setType(<FileType>type);
                this.controls.push(field);
                break;
            }
        }
    }

    /**
     * 设置控件为编辑状态
     *
     * @param  field EditControlField 控件
     * @return void
     */
    setFieldActive(field: EditControlField) {
        this.activeField = field;
        this.controls.forEach(element => element.setDefault());
        field.setActive();
        this.toolTab.changeTab('组件编辑');
    }

    removeField(field: EditControlField) {
        this.controls.splice(this.controls.indexOf(field), 1);
        this.activeField = null;
    }

    setFormEditActive() {
        this.activeField = null;
        this.controls.forEach(element => element.setDefault());
        this.toolTab.changeTab('表单编辑');
    }

    /**
     * 获取表单的json数据
     */
    getFormJson() {
        return JSON.stringify(this.controls);
    }

    /**
     * 使用json数据初始化编辑器
     * @param formJson string
     */
    fromFormJson(formJson: string) {
        const controls = JSON.parse(formJson);
        this.controls = [];
        controls.forEach(control => {
            this.addFiled(control.type, null);
            this.controls[this.controls.length - 1].initfromJson(control);
        });
    }
}
