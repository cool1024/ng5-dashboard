import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { AppConfig } from './../../../config/app.config';
@Component({
  selector: 'dashboard-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // 登入跳转页面
  homePageUrl = AppConfig.loginGoPage;

  // 菜单样式配置参数
  loginConfigs = {

  };

  // 登入状态
  loginState: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.loginState = this.authService.isLoggedIn;
  }

  // 登入方法
  login() {
    this.authService.setIn();
    this.router.navigateByUrl(this.homePageUrl);
  }
}
