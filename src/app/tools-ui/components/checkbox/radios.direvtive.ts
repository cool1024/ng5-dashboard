import {
    Directive,
    Input,
    Output,
    EventEmitter,
    HostListener,
    QueryList,
    ContentChildren,
    forwardRef,
    AfterContentInit,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef
} from '@angular/core';
import { RadioComponent } from './radio.component';

@Directive({
    selector: 'ts-radio-group',
    exportAs: 'tsRadioGroup',
})
export class RadioDirective implements AfterContentInit, OnChanges {

    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>(false);
    @ContentChildren(forwardRef(() => RadioComponent)) radioList: QueryList<RadioComponent>;

    constructor(private cdRef: ChangeDetectorRef) { }

    /**
     * 控件内容加载完成时的钩子方法
     */
    ngAfterContentInit() {
        this.replyValue();
    }

    /**
     * 控件值发生变化时的钩子方法
     */
    ngOnChanges(simpleChanges: SimpleChanges) {
        if (simpleChanges.hasOwnProperty('value') && !simpleChanges.value.isFirstChange()) {
            this.replyValue();
        }
    }

    /**
     * 当value变化时（不是radio修改的，而是外部修改value），重置radio的状态
     */
    replyValue() {
        const radioList = this.radioList.toArray();
        for (let i = 0; i < this.radioList.length; i++) {
            if (radioList[i].value === this.value) {
                radioList[i].checked = true;
            } else {
                radioList[i].checked = false;
            }
        }
        this.cdRef.detectChanges();
    }

    /**
     * 根据radio的数值变更，设置其他的radio为未选中状态
     */
    applyRadioValue() {
        const radioList = this.radioList.toArray();
        radioList.forEach(radio => {
            if (this.value !== radio.value) { radio.checked = false; }
        });
    }

    /**
     * 设置radio group的值
     * @param radio RadioComponent,触发变更的Radio
     */
    applyRadioChange(radio: RadioComponent) {
        this.value = radio.checked === true ? radio.value : null;
        this.valueChange.emit(this.value);
        this.applyRadioValue();
    }

}
