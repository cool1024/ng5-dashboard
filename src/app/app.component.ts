import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loginStatus = false;

  menuCanLoad(): boolean {
    return this.loginStatus;
  }

  headCanLoad(): boolean {
    return this.loginStatus;
  }

  contentCanLoad(): boolean {
    return this.loginStatus;
  }
}
