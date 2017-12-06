# RequestService 
### <span class="badge badge-primary">Injectable</span>
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

# ApiData 
### <span class="badge badge-success">Class</span>
```typescript
class ApiData {
    constructor(public result: boolean, public message: string, public datas?: any,public id?:number) { }
}
```
|变量名|类型|描述|
| ------ | ------ | ------ |
|result|boolean|接口调用结果(true:成功，false:失败)|
|message|string或string[]|接口提示信息|
|datas|any|接口返回数据,可选参数，只有接口调用成功才存在|
|id|number|用于添加类接口，提供新添加数据的ID参数|
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
#### 发送一个POST请求
------------------------------
```typescript
 post(url: string, params?: { [key: string]: number | string } | boolean, check = true): Observable<ApiData> 
```
>**参数**

>*url* : 请求地址

>*params* : 附带的请求参数

>*check* : （true|false）是否开启API校验，默认开启，开启后只有成功状态的API数据可以捕捉到

>**描述**

>使用这个方法可以用来发送一个POST请求，并获得响应的API数据

>**注意**

><span class="text-danger">不能用这个方法来上传文件！</span>

##### 简单示例
```typescript
@Component(...)
export class SimpleComponent implements OnInit {
     constructor(private requestService: RequestService) { }

     ngOnInit() {
         // 发送一个POST请求（只有成功的请求才会被捕获到）
         this.requestService.post( '/assets/json/datas-api.json', { name:'Jack', mobile:'123456789' }).subscribe(res => {
             // 控制台显示响应API数据
             console.log(res.datas);
         });
     }
}
```
#### 发送一个PUT请求
------------------------------
```typescript
 put(url: string, params?: { [key: string]: number | string } | boolean, check = true): Observable<ApiData> 
```
>**参数**

>*url* : 请求地址

>*params* : 附带的请求参数

>*check* : （true|false）是否开启API校验，默认开启，开启后只有成功状态的API数据可以捕捉到

>**描述**

>使用这个方法可以用来发送一个PUT请求，并获得响应的API数据

>**注意**

><span class="text-danger">不能用这个方法来上传文件！</span>

##### 简单示例
```typescript
@Component(...)
export class SimpleComponent implements OnInit {
     constructor(private requestService: RequestService) { }

     ngOnInit() {
         // 发送一个PUT请求（只有成功的请求才会被捕获到）
         this.requestService.put( '/assets/json/datas-api.json', { name:'Jack', mobile:'123456789' }).subscribe(res => {
             // 控制台显示响应API数据
             console.log(res.datas);
         });
     }
}
```

#### POST请求，文件上传，支持多文件，支持额外参数（不提供上传进度，不能用于大文件上传）
------------------------------
```typescript
files(
    url: string, params: { [key: string]: number | string },
    files: Array<{ name: string, files: Array<File> }>, 
    check = true
): Observable<ApiData>
```
>**参数**

>*url* : 请求地址

>*params* : 附带的请求参数

>*files* 上传的文件列表

>*check* : （true|false）是否开启API校验，默认开启，开启后只有成功状态的API数据可以捕捉到

>**描述**

>使用这个方法可以用来发送一个PUT请求，并获得响应的API数据

##### 简单示例
```typescript
@Component(...)
export class SimpleComponent implements OnInit {
     constructor(private requestService: RequestService) { }

     // 文件对象，从<input type="file>"中获取
     file:File

     ngOnInit() {
         // 发送一个POST请求（只有成功的请求才会被捕获到）
         this.requestService.file( 
             '/api/upload', 
             { name:'Jack', mobile:'123456789' },
             [ 
                { name: 'avatar', files: [this.file] }
             ]
        ).subscribe(res => {
             // 控制台显示响应API数据
             console.log(res.datas);
         });
     }
}
```
#### POST请求，文件上传，大文件上传，可以获取进度条
------------------------------
```typescript
upload(url: string, files: Array<{ name: string, files: Array<File> }>, onprogress: (value: number) => void, final: (value: any) => void)
```
>**参数**

>*url* : 请求地址

>*files* : 上传的文件列表，参考上面的files方法

>*onprogress* : 上传中用于获取上传进度的方法，value为0-100的整数

>*final* : 上传结束后的回掉方法，value为服务器响应

>**注意**

><span class="text-danger">这是一个实验性方法，且不会带请求头，没有权限令牌，建议定制开发，参考本方法自行编写上传请求代码</span>
