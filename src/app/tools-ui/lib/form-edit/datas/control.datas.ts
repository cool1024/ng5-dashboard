/**
 * 控件相关数据
 * control.datas.ts
 *
 * @author xiaojian
 */

import { InputType } from './../components/input-field/input.class';
import { TextAreaType } from './../components/textarea-field/textarea.class';
import { ControlType } from './../classes/edit.class';
import { DateType } from '../components/date-field/date.class';
import { FileType } from '../components/file-field/file.class';

export const ControlTypes = {
    baseControls: [
        { text: '单行文本', icon: 'font', type: InputType.TEXT, controlType: ControlType.DEFAULT_INPUT },
        { text: '数字', icon: 'list-ol', type: InputType.NUMBER, controlType: ControlType.DEFAULT_INPUT },
        { text: '密文', icon: 'key', type: InputType.PASSWORD, controlType: ControlType.DEFAULT_INPUT },
        { text: '多行文字', icon: 'file-text-o', type: TextAreaType.BASE, controlType: ControlType.TEXTAREA },
        { text: '下拉选项', icon: 'caret-down', type: ControlType.SELECT, controlType: ControlType.SELECT },
        { text: '单选项', icon: 'dot-circle-o', type: ControlType.RADIO, controlType: ControlType.RADIO },
        // { text: '多选项' },
        { text: '描述文本', icon: 'paragraph', type: ControlType.TEXT, controlType: ControlType.TEXT },
    ],
    toolControls: [
        { text: '日期', icon: 'calendar', type: DateType.DATE, controlType: ControlType.DATE },
        { text: '时间', icon: 'clock-o', type: DateType.TIME, controlType: ControlType.DATE },
        { text: '图片', icon: 'file-image-o', type: FileType.IMAGE, controlType: ControlType.FILE },
        { text: '附件', icon: 'folder-o', type: FileType.FILE, controlType: ControlType.FILE },
    ]
};
