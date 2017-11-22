import { Component } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {

  tabChange(activeTabTitle) {
    console.log(`active tab :${activeTabTitle}`);
  }
}
