import { Component } from '@angular/core';
import { AuthService } from './dashboard/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService) { }

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
