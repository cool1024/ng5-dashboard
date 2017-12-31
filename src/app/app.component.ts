import { Component, OnInit } from '@angular/core';
import { AuthService } from './dashboard/services/auth.service';
import { GlobalValueService } from './dashboard/services/global-value.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private global: GlobalValueService) { }

  ngOnInit() {
    this.global.setValue('checkStatus', false);
  }

  get checkStatus(): boolean {
    return <boolean>this.global.values.checkStatus || false;
  }

  get loginStatus(): boolean {
    return this.authService.isLoggedIn;
  }

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
