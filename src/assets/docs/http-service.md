# RequestService <span class="badge badge-primary">INJECTABLE</span>
----------------------
<table class="table table-bordered">
    <tbody>
        <tr>
            <th scope="row" class="w-25">导入方式</th>
            <td>
                <code>import { RequestService } from './&lt;path&gt;/dashboard/services/request.service';
                </code>
            </td>
        </tr>
        <tr>
            <th scope="row" class="w-25">文件路径</th>
            <td class="text-primary">app/dashboard/service/request.service.service.ts</td>
        </tr>
    </tbody>
</table>
#### 引入服务到页面组件中
--------------------------------
```typescript
import { Component, OnInit } from '@angular/core';
import { RequestService } from './dashboard/services/request.service';

@Component({
  templateUrl: './simple.component.html',
})
export class SimpleComponent implements OnInit {
     constructor(private requestService: RequestService) { }

     ngOnInit() {

     }
}
```
#### 获取一个文本文件/文本内容
--------------------------------
```typescript
text(url: string): Observable<string>
```
>**参数**

>*url* : 请求地址

>**描述**

>使用这个方法可以获取响应的文本内容

##### 简单示例
```typescript
@Component(...)
export class SimpleComponent implements OnInit {
     constructor(private requestService: RequestService) { }

     ngOnInit() {
         // 获取一个markdown文件内容
         this.requestService.text(`/assets/docs/http-service.md`).subscribe(content => {
             // 控制台显示文本内容
             console.log(content);
         });
     }
}
```
#### 发送一个GET请求
--------------------------------
```typescript
// 发送一个GET请求，不带参数
url(url: string, check = true): Observable<ApiData>
// 发送一个GET请求，带参数
get(url: string, params: { [key: string]: number | string } | null, check = true): Observable<ApiData>
```
>**参数**

>*url* : 请求地址

>*params* : 附带的请求参数

>*check* : （true|false）是否开启API校验，默认开启，开启后只有成功状态的API数据可以捕捉到


>**描述**

>使用这个方法可以用来发送一个GET请求，并获得响应的API数据

##### 简单示例
```typescript
@Component(...)
export class SimpleComponent implements OnInit {
     constructor(private requestService: RequestService) { }

     ngOnInit() {
         // 发送一个GET请求（只有成功的请求才会被捕获到）
         this.requestService.get('/assets/json/datas-api.json').subscribe(res => {
             // 控制台显示响应API数据
             console.log(res.datas);
         });
         // 发送一个GET请求（手动判断接口调用结果正确性）
         this.requestService.get('/assets/json/datas-api.json', { id: 1 }, false).subscribe(res => {
             if(res.result){
                // 接口调用成功，控制台显示响应API数据
                console.log(res.datas);
             }else{
                // 接口调用失败，控制台显示错误信息
                console.log(res.message);
             }
         });
     }
}
```