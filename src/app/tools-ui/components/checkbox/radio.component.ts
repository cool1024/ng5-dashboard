/**
 * radio组件文件
 *
 * @file radio.component.ts
 * @author xiaojian
 * @date 2018年02月28日
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * RadioComponent
 */
@Component({
    selector: 'ts-radio',
    templateUrl: './radio.component.html',
})
export class RadioComponent implements OnInit {

    // radio文本标签
    @Input() label: string;

    // radio选中时的值
    @Input() value: any;

    // radio是否被选中
    @Input() checked: boolean;

    // radio颜色
    @Input() color: string;

    // radio默认颜色
    @Input() defaultColor: string;

    // radio积极状态下的颜色
    @Input() activeColor: string;

    // radio类型，支持dot(点)和circle(圆)
    @Input() type: string;

    // radio被选中状态变更时触发
    @Output() checkedChange = new EventEmitter<boolean>(false);

    // radio状态变更的绑定handle
    @Output() groupHandle = new EventEmitter<RadioComponent>(false);


    /**
     * 构造方法
     */
    constructor() {
        this.type = 'dot';
        this.checked = false;
    }

    /**
     * 组件初始化钩子方法
     */
    ngOnInit() {
        if (this.color) {
            this.activeColor = this.defaultColor = this.color;
        }
    }

    /**
     * 反转组件状态（组件被点击时执行）
     */
    changeStatus() {
        this.checked = !this.checked;
        this.checkedChange.emit(this.checked);
        this.groupHandle.emit(this);
    }
}
