/**
 * 文本框类文件
 * input.class.ts
 * @author xiaojian
 * @date   2018年02月27日
 */

import { EditControlField, ControlType } from './../../classes/edit.class';

/**
 * input枚举类型
 * InputType
 */
export enum InputType {
    TEXT = 'text',
    NUMBER = 'number',
    DATE = 'date',
    TIME = 'time',
    PASSWORD = 'password',
}

/**
 * input默认配置参数集合
 * DefaultConfig
 */
export const DefaultConfig = {
    text: { title: '单行文本', placeholder: '请输入文字' },
    number: { title: '数字', placeholder: '请输入一个数字' },
    date: { title: '日期', placeholder: '请输入日期' },
    time: { title: '时间', placeholder: '请输入时间' },
    password: { title: '密文', placeholder: '请输入密文' },
};

/**
 * input类型数组
 * InputTypes
 */
export const InputTypes = [
    { value: InputType.TEXT, text: '文本' },
    { value: InputType.NUMBER, text: '数字' },
    { value: InputType.DATE, text: '日期' },
    { value: InputType.TIME, text: '时间' },
    { value: InputType.PASSWORD, text: '密码' },
];

/**
 * 文本框类
 * InputControlField
 */
export class InputControlField extends EditControlField {

    //  input类型
    inputType: InputType;

    // 输入范围
    ranges: [string, string];

    // 默认值
    defaultValue: string | number;

    /**
     * 构造方法
     *
     * @return void
     */
    constructor() {
        super(ControlType.DEFAULT_INPUT);
        this.setType(InputType.TEXT);
        this.ranges = ['', ''];
    }

    /**
     * 使用json对象初始化控件
     *
     * @return void
     */
    initfromJson(json: { [key: string]: any }) {
        this.title = json.title;
        this.placeholder = json.placeholder;
        this.inputType = json.inputType;
        this.ranges = json.ranges;
        this.defaultValue = json.defaultValue;
    }

    /**
     * 设置input的类型
     *
     * @param inputType InputType，input类型
     */
    setType(inputType: InputType) {
        if (!inputType) { return; }
        this.inputType = inputType;
        this.title = DefaultConfig[inputType].title;
        this.placeholder = DefaultConfig[inputType].placeholder;
    }

}
