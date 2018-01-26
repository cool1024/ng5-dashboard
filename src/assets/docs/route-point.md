#### 可能用到的模块
----------------------
```typescript
import { RouterModule, Routes ,ActivatedRoute} from '@angular/router';
```
#### 导航链接书写 
----------------------
```html
<!--路由出口-->
<router-outlet></router-outlet>

<!--链接，积极状态时设置class样式-->
<a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>

<!--带参数的路由（id参数是可选的哦）-->
<a [routerLink]="['/hero', id]">Hero Center</a>
```
#### 一个路由
----------------------
```typescript
// 带参数的路由（id参数是可选的哦）
{ path: 'hero/:id', component: HeroDetailComponent }
```
#### 路由跳转，获取URL中的参数
----------------------
```typescript
// 路由跳转（带参数）
this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);

// 路由跳转（直接跳转）
this.router.navigate('/heroes');

// 用ActivatedRoute获取路由参数
this.activatedRoute.params.subscribe(params => {
    console.log(params.id)
});

// 用ActivatedRoute获取地址栏里面的其他参数，如微信跳转的参数
this.activatedRoute.queryParams.subscribe(params => {
    console.log(params.id)
});
```
#### 子路由，列表页面跳转详情页面
----------------------
>同一个路由出口，每天切换链接都会刷新页面数据，然而很多场景下我们需要返回上一个页面保留原来的数据，如在列表页跳转到详情页面，详情页返回列表时候，希望还是原来的页面，数据。这里使用子路由就可以解决，我们在列表页面中加入一个路由出口*&lt;router-outlet&gt;&lt;/router-outlet&gt;*,详情可以<a href="/table/simple">参考功能表格->标准表格</a>的做法

<br>
1.列表页面HTML模板list.component.html

```html
<!--子路由出口，当详情页显示时，隐藏列表页内容,不要使用ngIf-->
<div [ngClass]="{'d-none':outlet.isActivated}">
    <!--列表页面内容-->
</div>
<!--子路由出口，详情页-->
<router-outlet #outlet="outlet"></router-outlet>
```
2.模块中的路由配置*.routing.ts,注意代码中的children，里面是子路由列表，可以放很多子页面
```typescript
const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    data: { breadcrumbs: new Breadcrumbs([['列表', 'table']]) },
    children: [
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: { breadcrumbs: new Breadcrumbs([['列表', 'table', '/table/simple'], ['详情', 'info']]) },
      }
    ]
  },
];
```
3.注意路由链接的书写<br>
列表页面为 *<span class="text-primary">/list</span>*<br>
详情页面为 *<span class="text-primary">/list/detail/1</span>*<br>
