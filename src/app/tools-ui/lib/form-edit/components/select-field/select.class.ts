/**
 * select相关类文件
 * select.class.ts
 * @author xiaojian
 * @date   2018年02月27日
 */

import { EditControlField, ControlType } from './../../classes/edit.class';

/**
 * select默认配置参数
 */
export const DefaultConfig = {
    title: '下拉选项',
    placeholder: '请选择选项'
};

/**
 * 文本框类
 * InputControlField
 */
export class SelectControlField extends EditControlField {


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
        super(ControlType.SELECT);
        this.title = DefaultConfig.title;
        this.placeholder = DefaultConfig.placeholder;
        this.defaultValue = 0;
        this.options = ['选项一', '选项二'];
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
     * 新增下拉选项
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
