# 可能用到的模块
```typescript
import { RouterModule, Routes ,ActivatedRoute} from '@angular/router';
```
# 导航链接书写 
----------------------
```html
<!--路由出口-->
<router-outlet></router-outlet>

<!--链接，积极状态时设置class样式-->
<a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>

<!--带参数的路由（id参数是可选的哦）-->
<a [routerLink]="['/hero', id]">Hero Center</a>
```
```typescript
// 带参数的路由（id参数是可选的哦）
{ path: 'hero/:id', component: HeroDetailComponent }

// 路由跳转
this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);

// 用ActivatedRoute获取路由参数
this.activatedRoute.params.subscribe(params => {
    console.log(params.id)
});

// 用ActivatedRoute获取地址栏里面的其他参数，如微信跳转的参数
this.activatedRoute.queryParams.subscribe(params => {
    console.log(params.id)
});
```