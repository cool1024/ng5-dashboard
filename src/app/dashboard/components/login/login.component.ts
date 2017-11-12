import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'dashboard-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // 菜单样式配置参数
  loginConfigs = {

  };

  // 登入状态
  loginState: boolean;

  constructor(private authService: AuthService) {
    this.loginState = this.authService.isLoggedIn;
  }

  // 登入方法
  login() {
    this.authService.setIn();
    console.log(111);
  }
}
