import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  template: ``
})
export class LoginComponent {

  constructor(private auth: AuthService) {
    this.auth.setOut();
  }

}
