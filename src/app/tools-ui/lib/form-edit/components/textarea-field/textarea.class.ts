/**
 * textarea相关类文件
 * textarea.class.ts
 * @author xiaojian
 * @date   2018年02月27日
 */

import { EditControlField, ControlType } from './../../classes/edit.class';

/**
 * input枚举类型
 * InputType
 */
export enum TextAreaType {
    BASE = 'base',
    NUMBER = 'number',
    DATE = 'date',
    TIME = 'time',
    PASSWORD = 'password',
}

/**
 * input类型数组
 * InputTypes
 */
export const TextAreaTypes = [
    { value: TextAreaType.BASE, text: '基础文本' },
];

/**
 * 文本框类
 * InputControlField
 */
export class TextAreaControlField extends EditControlField {

    //  input类型
    textAreaType: TextAreaType;

    // 输入范围
    ranges: [number, number];

    // 默认值
    defaultValue: string | number;

    /**
     * 构造方法
     *
     * @return void
     */
    constructor() {
        super(ControlType.TEXTAREA);
        this.textAreaType = TextAreaType.BASE;
        this.ranges = [0, 100];
    }

    /**
     * 使用json对象初始化控件
     *
     * @return void
     */
    initfromJson(json: { [key: string]: any }) {
        this.title = json.title;
        this.placeholder = json.placeholder;
        this.ranges = json.ranges;
        this.defaultValue = json.defaultValue;
        this.textAreaType = json.textAreaType;
    }
}
