/**
 * radio相关类文件
 * radio.class.ts
 * @author xiaojian
 * @date   2018年02月27日
 */

import { EditControlField, ControlType } from './../../classes/edit.class';

/**
 * Radio默认配置
 */
export const DefaultConfig = {
    title: '单选',
    options: ['选项一', '选项二'],
    defaultValue: 0,
};

/**
 * Radio控件类
 * RadioControlField
 */
export class RadioControlField extends EditControlField {


    // 选项列表
    options: string[];

    // 默认值
    defaultValue: number;

    /**
     * 构造方法
     *
     * @return void
     */
    constructor() {
        super(ControlType.RADIO);
        this.title = DefaultConfig.title;
        this.options = DefaultConfig.options.concat();
        this.defaultValue = DefaultConfig.defaultValue;
    }

    /**
     * 使用json对象初始化控件
     *
     * @return void
     */
    initfromJson(json: { [key: string]: any }) {
        this.title = json.title;
        this.placeholder = json.placeholder;
        this.options = json.options;
        this.defaultValue = json.defaultValue;
    }

    /**
     * 新增选项
     *
     * @param options string|string[] 需要新增的选项，可以是一个选项数组
     */
    addOptions(options: string | string[]) {
        if (typeof options === 'string') {
            this.options.push(options);
        } else {
            this.options = this.options.concat(options);
        }
    }

    /**
     * 移除指定位置的选项
     *
     * @param index number.选项位置
     */
    removeOptions(index: number) {
        this.options.splice(index, 1);
    }

}
