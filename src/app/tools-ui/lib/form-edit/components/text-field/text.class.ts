/**
 * text相关类文件
 * text.class.ts
 * @author xiaojian
 * @date   2018年02月27日
 */

import { EditControlField, ControlType } from './../../classes/edit.class';

/**
 * Radio默认配置
 */
export const DefaultConfig = {
    title: '主标题',
    subject: '副标题'
};

/**
 * Text控件类
 * TextControlField
 */
export class TextControlField extends EditControlField {


    // 副标题
    subject: string;

    /**
     * 构造方法
     *
     * @return void
     */
    constructor() {
        super(ControlType.TEXT);
        this.title = DefaultConfig.title;
        this.subject = DefaultConfig.subject;
    }

    /**
     * 使用json对象初始化控件
     *
     * @return void
     */
    initfromJson(json: { [key: string]: any }) {
        this.title = json.title;
        this.subject = json.subject;
    }
}
