/**
 * date相关类文件
 * date.class.ts
 * @author xiaojian
 * @date   2018年02月27日
 */

import { EditControlField, ControlType } from './../../classes/edit.class';

/**
 * Date枚举类型
 * DateType
 */
export enum DateType {
    DATE = 'date',
    TIME = 'time',
}

/**
 * Date默认配置参数集合
 * DefaultConfig
 */
export const DefaultConfig = {
    date: { title: '日期', placeholder: '请输入日期' },
    time: { title: '时间', placeholder: '请输入时间' },
};

/**
 * input类型数组
 * DateTypes
 */
export const DateTypes = [
    { value: DateType.DATE, text: '日期' },
    { value: DateType.TIME, text: '时间' },
];

/**
 * Date控件类
 * DateControlField
 */
export class DateControlField extends EditControlField {

    // 日期控件类型
    dateType: DateType;

    /**
     * 构造方法
     *
     * @return void
     */
    constructor() {
        super(ControlType.DATE);
        this.title = DefaultConfig.date.title;
        this.placeholder = DefaultConfig.date.placeholder;
        this.dateType = DateType.DATE;
    }

    /**
     * 使用json对象初始化控件
     *
     * @return void
     */
    initfromJson(json: { [key: string]: any }) {
        this.title = json.title;
        this.placeholder = json.placeholder;
        this.dateType = json.dateType;
    }

    /**
     * 设置Date的类型
     *
     * @param dateType DateType
     */
    setType(dateType: DateType) {
        if (!dateType) { return; }
        this.dateType = dateType;
        this.title = DefaultConfig[dateType].title;
        this.placeholder = DefaultConfig[dateType].placeholder;
    }
}
