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

  constructor() { }

  ngAfterContentInit() {
    this.replyValue();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (!simpleChanges.values.isFirstChange() && !!simpleChanges.values) {
      this.replyValue();
    }
  }

  replyValue() {
    const defaultValues = this.getDefaultValues();
    const checkboxList = this.checkboxList.toArray();
    setTimeout(() => {
      checkboxList.forEach((_, i) => {
        checkboxList[i].checked = false;
      });
      this.values.forEach(value => {

        const i = defaultValues.indexOf(value);
        if (i >= 0) {
          checkboxList[i].checked = true;
        }
      });
    });
  }

  getGroupValue() {
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
