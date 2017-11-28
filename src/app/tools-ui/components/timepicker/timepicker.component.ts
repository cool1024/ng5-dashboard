import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ToggleComponent } from './../../interfaces/toggle-component.interface';
import { HtmlDomService } from './../../services/htmldom.services';

@Component({
  selector: 'ts-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css'],
  exportAs: 'timePicker',
})
export class TimepickerComponent implements OnDestroy, ToggleComponent {

  @Input() activeTime: { hour: number, minute: number, second: number };
  @Input() confirmBtnClass: string;
  @Input() cancelBtnClass: string;
  @Input() confirmText: string;
  @Input() cancelText: string;
  @Input() title: string;

  @Output() activeTimeChange = new EventEmitter<{ hour: number, minute: number, second: number }>(false);

  @ViewChild('pad') pad: ElementRef;
  @ViewChild('timepicker') datepicker: ElementRef;

  time: { hour: number, minute: number, second: number };
  show: boolean;
  autoHandle: any;
  toggleDom: HTMLElement;
  ticking = false;
  timepickerStyle = { top: '0', left: '0', display: 'none', position: 'absolute' };

  constructor(private htmlDomService: HtmlDomService) {
    const date = new Date();
    this.time = { hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() };
    this.confirmBtnClass = 'btn-outline-dark border-0';
    this.cancelBtnClass = 'btn-outline-secondary border-0';
    this.show = false;
    this.confirmText = 'confirm';
    this.cancelText = 'cancel';
    this.title = 'Time';
  }

  confirm() {
    this.activeTimeChange.emit(
      { hour: this.time.hour, minute: this.time.minute, second: this.time.second }
    );
    this.toggle();
  }

  cancel() {
    this.toggle();
  }

  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.autoPosition();
      if (this.activeTime) {
        if (this.activeTime.hour > 0 && this.activeTime.hour < 24) {
          this.time.hour = this.activeTime.hour;
        }
        if (this.activeTime.minute > 0 && this.activeTime.minute < 60) {
          this.time.minute = this.activeTime.minute;
        }
        if (this.activeTime.second > 0 && this.activeTime.second < 60) {
          this.time.second = this.activeTime.second;
        }
      }
    }
  }

  bind(elementRef: ElementRef) {
    this.toggleDom = elementRef.nativeElement;
    this.autoHandle = () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          if (this.show) {
            this.autoPosition();
          }
          this.ticking = false;
        });
      }
      this.ticking = true;
    };
    window.addEventListener('scroll', this.autoHandle, false);
    window.addEventListener('resize', this.autoHandle, false);
  }

  autoPosition() {
    setTimeout(() => {
      const position = this.htmlDomService.getPosition(this.toggleDom);
      const height = this.htmlDomService.getHeight(this.toggleDom);
      this.timepickerStyle.display = 'none';
      this.timepickerStyle.left = position.x + 'px';
      this.timepickerStyle.top = height + position.y + 7.5 + 'px';
      let top = height + position.y + 7.5 + 160;
      if (window.innerHeight < top) {
        top = window.innerHeight - 160 - 7.5;
      } else {
        top = position.y + height + 7.5;
      }
      this.timepickerStyle.top = top + 'px';
      this.timepickerStyle.display = '';
    });
  }

  tryClose($event) {
    if ($event.target === this.pad.nativeElement) {
      this.toggle();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.autoHandle);
    window.removeEventListener('resize', this.autoHandle);
  }

  addHour() {
    if (this.time.hour < 23) {
      this.time.hour++;
    }
  }

  decHour() {
    if (this.time.hour > 0) {
      this.time.hour--;
    }
  }

  addMinute() {
    if (this.time.minute < 59) {
      this.time.minute++;
    }
  }

  decMinute() {
    if (this.time.minute > 0) {
      this.time.minute--;
    }
  }

  addSecond() {
    if (this.time.second < 59) {
      this.time.second++;
    }
  }

  decSecond() {
    if (this.time.second > 0) {
      this.time.second--;
    }
  }

  autoTime($event: any, type: number) {
    let offset = $event.deltaY || 0;
    offset /= 3;
    if (offset > 0) {
      for (let i = 0; i < offset; i++) {
        if (type === 0) { this.addHour(); }
        if (type === 1) { this.addMinute(); }
        if (type === 2) { this.addSecond(); }
      }
    } else {
      offset = -offset;
      for (let i = 0; i < offset; i++) {
        if (type === 0) { this.decHour(); }
        if (type === 1) { this.decMinute(); }
        if (type === 2) { this.decSecond(); }
      }
    }
  }
}
