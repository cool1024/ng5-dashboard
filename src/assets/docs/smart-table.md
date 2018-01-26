# 集成表格
-------------------------
## 对象概览
---------------------------------
<br>
<br>
### TSTableModule <span class="badge badge-success">Module</span>

```typescript
// 可以参考app/modules/table/table.module.ts文件
import { TSTableModule } from '<path>/tools-ui';

...

@NgModule({
  imports: [
    ...
    TSTableModule,
    ...
  ],

})
```
<br>
<br>
### SmartTableComponent <span class="badge badge-info">Component</span>
---------------------------------
#### Metadata
|元数据|值|
| -------- | --------------------------- |
|selector|<code>ts-smart-table</code>|
|exportAs|<code>tsSmartTable</code>|

#### @Input
 ```typescript
 // 表格配置参数，一般只允许设置一次（只能赋值一次）
 @Input() config: SmartConfig;
 ```

#### Method
|方法名|参数|说明|
| --- |--- |--- |
|pageChanged|无|刷新表格数据（会重新请求一次接口）|
|resetSearch|无|重置查询，并刷新表格数据（会清空search参数，页码回到第一页，并请求数据接口）|
|doSearch|无|数据查询，调用数据接口，并把查询参数传递过去|

#### Property
|属性名称|类型|说明|
| --- |--- |--- |
|pagination|Pagination|分页对象，提供了表格的分页数据与方法的支持|
|search|SearchParams|查询对象，提供了表格的查询数据与方法的支持|
<br>
<br>
### Pagination <span class="badge badge-info">Class</span>
---------------------------------
#### Property
|属性名称|类型|说明|
| --- |--- |--- |
|total|number|数据总量，默认为0|
|page|number|当前页码，默认为1|
|limit|number|每页最大数据量，默认为10|
|offset|number|只读，当前偏移量，用于数据库查询|
|pageData|{ limit: number, offset: number}|只读，获取分页参数的json值|
|maxPage|number|只读，最大页码|

#### Method
|方法名|参数|返回值|说明|
| --- |--- | --- | --- |
|reset|无|无|重置分页参数，所有的参数都设为默认值|
|hasNext|无|boolean|判断是否有下一页|
|hasPrev|无|boolean|判断是否有上一页|
|clone|无|Pagination|获取一个分页对象的副本|
|getpageDataWith|params : {[key:string]:any}|{ limit: number, offset: number , ...}|获取分页参数的json值，并附带额外的参数,这个方法结合search参数可以解决复杂的查询|

#### 使用例子
```typescript
// 创建一个新的分页对象
const pagination = new Pagination();
// 设置每页显示的最大数据量为20(默认值为10)
pagination.limit = 20;
// 调用接口获取数据
http.get('/api/list',this.pagination.pageData).subscrible(res=>{

    // 更新数据总量
    pagination.total = res.datas.total;
});
```
<br>
<br>
### SearchParams <span class="badge badge-info">Class</span>
---------------------------------
#### Property
|属性名称|类型|说明|
| --- |--- |--- |
|params|{[key: string]: any}|查询参数，这个是基本的json类型，所有查询参数的值都在里面|
|values|{[key: string]: any}|处理过的查询参数，只有有效的参数才会被返回|

#### Method
|方法名|参数|返回值|说明|
| --- |--- | --- | --- |
|clean|无|无|清空查询参数，全部设为默认的空值|

#### 使用例子
```typescript
// 创建一个新的查询对象,并设置-1为空值（如果查询参数中有-1这个数字，将会被认为是空值而被忽略，values将会剔除这个参数）
const search = new SearchParams({},-1);
// 创建一个新的分页对象
const pagination = new Pagination();

// 调用接口获取数据
http.get('/api/list',pagination.pageDataWith(search.value)).subscrible(res=>{

    // 更新数据总量
    pagination.total = res.datas.total;
});
```

## SMART-TABLE使用
---------------------------------------
### 模板代码
```typescript
<ts-smart-table #table="tsSmartTable" [config]="config"></ts-smart-table>
```
### 页面组件代码
```typescript
import { Component } from '@angular/core';
import {
    DefaultSmartConfig,// 默认表格配置参数对象，这个对象大大简化了表格的参数配置
    TextRowConfig,  // 简单表格文本
    AvatarDiyRowConfig, // 自定义图片文本
    TextGroupConfig, // 两行文本
    DiyItemsConfig, // 自定义元素集合
    ButtonsRowConfig, // 按钮集合
    TdButton // 按钮对象
} from '../../../../tools-ui';
import { RequestService } from '../../../../dashboard/services/request.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: '...',
    templateUrl: '...',
})
export class TestSmartComponent {

    config: DefaultSmartConfig;

    constructor(private request: RequestService) {
        // 初始化一个表格配置对象
        this.config = new DefaultSmartConfig();
        // 设置数据接口地址，和http服务对象
        this.config.setLoad(request, '/vip/user/search');
        // 设置表格样式类
        this.config.appendClass('table-bordered');
        // 设置表格标题
        this.config.appHeaders('No.', '用户', '联系方式', '地址', '等级（积分）', '操作');
        // 设置表格单元格渲染对象
        this.config.appendRows(
            new TextRowConfig('id'),// 第一列显示一个文本，对应的数据属性为id(如api接口返回的每行数据结构里面的{id:1,....})
            new AvatarDiyRowConfig(['avatar', 'nick', 'gender'], [
                item => `${item}`,
                item => item === 0 ? `<small class="text-info"><i class="fa fa-mars fa-fw"></i>先生<small>` :
                    (item === 1 ? `<small class="text-danger"><i class="fa fa-mercury fa-fw"></i>女士<small>` :
                        `<small class="text-muted">未设置</small>`)
            ]),// 设置第二列为一个自定义图片文本
            new TextGroupConfig(['phone', 'email']),
            new TextRowConfig('location'),
            new DiyItemsConfig(['vip_level', 'vip_credit'], items => `Lv.${items[0]}（积分：${items[1]}）`),
            new ButtonsRowConfig([
                new TdButton('详情', 'btn btn-sm btn-info', item => this.showUserInfoModal(item.id), 'fa fa-fw fa-info'),
                new TdButton('充值', 'btn btn-sm btn-primary', item => this.showRechargeModal(item.id), 'fa fa-fw fa-credit-card'),
                new TdButton('删除', 'btn btn-sm btn-danger', item => this.confirmDelete(item), 'fa fa-fw fa-remove'),
            ]),
        );
    }

    // 显示用户详情(如果希望修改用户成功后做刷新表格的操作，请返回一个Observale,如果不需要则什么都不返回)
    showUserInfoModal(id: number): Observable<void> {
        const sub = new Subject<void>();
        this.modal.create(VipUserInfoModalComponent);
        this.modal.modal.instance.user.id = id;
        this.modal.open().next(() => sub.next());
        return sub.asObservable();
    }

    // 删除用户(如果希望删除成功后做刷新表格的操作，请返回一个Observale,如果不需要则什么都不返回)
    confirmDelete(user: VipUser): Observable<void> {
        const sub = new Subject<void>();
        .....
        return sub.asObservable();
    }

    // 用户充值(如果希望用户充值成功后做刷新表格的操作，请返回一个Observale,如果不需要则什么都不返回)
    showRechargeModal(id: number): Observable<void> {
        const sub = new Subject<void>();
        .....
        return sub.asObservable();
    }
}

```
## SMART-TABLE 笔记
---------------------------------------
>1. 更多表格元素介绍可以查看文件`app/modules/table/pages/smart/smart.component.ts`
2. format方法只能使用原生的html标签
3. 按钮的执行方法可以不返回Observable对象，如果不返回那么方法执行后不会刷新表格数据
4. 刷新表格数据都是重新调用接口获取