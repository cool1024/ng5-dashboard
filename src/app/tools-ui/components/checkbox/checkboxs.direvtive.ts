import { Directive, Input, Output, EventEmitter, QueryList, ContentChildren, forwardRef, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';
@Directive({
  selector: 'ts-checkbox-group',
  host: {
    '(click)': 'getGroupValue()'
  },
})
export class CheckboxsDirective implements AfterContentInit, OnChanges {

  @Input() values: Array<any>;
  @Output() valuesChange = new EventEmitter<any>();
  @ContentChildren(forwardRef(() => CheckboxComponent)) checkboxList: QueryList<CheckboxComponent>;

  // 内部变化
  isInsideChange = false;


  constructor() { }

  ngAfterContentInit() {
    this.replyValue();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.values && !simpleChanges.values.isFirstChange()) {
      if (!this.isInsideChange) {
        this.replyValue();
      }
      this.isInsideChange = false;
    }
  }

  replyValue() {
    const defaultValues = this.getDefaultValues();
    const checkboxList = this.checkboxList.toArray();
    setTimeout(() => {
      for (const checkbox of checkboxList) {
        if (defaultValues.indexOf(checkbox.value) >= 0) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      }
    });
  }

  getGroupValue() {
    this.isInsideChange = true;
    this.values = [];
    this.checkboxList.forEach(checkbox => {
      if (checkbox.checked === true) {
        this.values.push(checkbox.value);
      }
    });
    this.valuesChange.emit(this.values);
  }

  getDefaultValues(): Array<any> {
    const values = new Array<any>();
    this.checkboxList.forEach(checkbox => {
      values.push(checkbox.value);
    });
    return values;
  }
}
