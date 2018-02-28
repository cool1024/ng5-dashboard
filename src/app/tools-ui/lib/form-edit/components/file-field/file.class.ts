/**
 * file相关类文件
 * file.class.ts
 * @author xiaojian
 * @date   2018年02月27日
 */

import { EditControlField, ControlType } from './../../classes/edit.class';

/**
 * File枚举类型
 * FileType
 */
export enum FileType {
    IMAGE = 'image',
    FILE = 'file',
}

/**
 * File默认配置参数集合
 * DefaultConfig
 */
export const DefaultConfig = {
    image: { title: '图片' },
    file: { title: '附件' },
};

/**
 * File类型数组
 * FileType
 */
export const FileTypes = [
    { value: FileType.IMAGE, text: '图片' },
    { value: FileType.FILE, text: '附件' },
];

/**
 * File控件类
 * FileControlField
 */
export class FileControlField extends EditControlField {

    // 文件控件类型
    fileType: FileType;

    // 允许上传多个文件
    multiple: boolean;

    /**
     * 构造方法
     *
     * @return void
     */
    constructor() {
        super(ControlType.FILE);
        this.setType(FileType.IMAGE);
        this.multiple = false;
    }

    /**
     * 使用json对象初始化控件
     *
     * @return void
     */
    initfromJson(json: { [key: string]: any }) {
        this.title = json.title;
        this.placeholder = json.placeholder;
        this.fileType = json.fileType;
        this.multiple = json.multiple;
    }

    /**
     * 设置ImageField的类型
     *
     * @param fileType ImageType
     */
    setType(fileType: FileType) {
        if (!fileType) { return; }
        this.fileType = fileType;
        this.title = DefaultConfig[fileType].title;
    }
}
