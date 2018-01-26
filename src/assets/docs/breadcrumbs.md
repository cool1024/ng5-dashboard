### 面包屑导航
-------------------------
> 可以在设置路由的时候附带面包屑数据,使用Breadcrumbs来管理这些导航

><code>['列表', 'table', '/table/simple']</code> 第一个参数为标题，第二个参数是字体名称(目前只支持FontAwesome),第三个参数为面包屑跳转的链接，可以不填

```typescript
{
    path: 'url',
    component: DetailComponent,
    data: { breadcrumbs: new Breadcrumbs([['列表', 'table', '/table/simple'], ['详情', 'info']]) }
}
```