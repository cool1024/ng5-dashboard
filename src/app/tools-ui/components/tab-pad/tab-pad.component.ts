import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ts-tab',
  templateUrl: './tab-pad.component.html',
  styleUrls: ['./tab-pad.component.css']
})
export class TabPadComponent implements OnInit {

  @Input() tabs: Array<string>;

  @Input() activeTab: string;

  @Input() position: string;

  @Input() type: string;

  @Input() color: string;

  @Input() pads: Array<any>;

  @Output() tabChange = new EventEmitter<string>();

  @Input() activeClass: string;

  constructor() {
    this.activeClass = '';
  }

  ngOnInit() {
    this.showPad(this.activeTab || '');
  }

  isActive(tab: string): boolean {
    return tab === (this.activeTab || '');
  }

  changeTab(tab: string) {
    this.activeTab = tab;
    this.showPad(tab);
    this.tabChange.emit(tab);
  }

  showPad(tab: string) {
    if (this.pads !== undefined && this.pads.length > 0) {
      this.pads.forEach(e => {
        const tabName = e.getAttribute('tab');
        if (tabName !== undefined && tabName === tab) {
          e.style.display = '';
        } else {
          e.style.display = 'none';
        }
      });
    }
  }

  getBgColor(): string {
    if (this.type !== 'pills') { return ''; }
    const color = this.color || 'primary';
    if (color === 'white' || color === 'light' || color === 'warning') {
      return `bg-${color} text-dark`;
    } else {
      return `bg-${color} text-white`;
    }
  }
}
