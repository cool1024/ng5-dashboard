# RequestService <span class="badge badge-primary">Injectable</span>
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

# ApiData  <span class="badge badge-success">Class</span>
```typescript
class ApiData {
    // 接口调用结果
    public result: boolean,
    // 接口返回信息，可能是字符串，或一个消息实体
    public message: string | { [key: string]: string[] },
    // 接口返回数据，数据格式以接口文档为准
    public datas: any | { rows: any[], total: number } = {},
    // 接口调用返回的id字段，大部分接口没有（这个参数基本被弃用，请不要再使用）
    public id: number = 0
    // 把ApiData转换为JSON串
    toJsonString(): string;
    // 获取返回消息，如果是字符串就直接返回，如果是消息实体则返回实体中的第一条消息   
    get messageStr(): string;
}
```
|变量名|类型|描述|
| ------ | ------ | ------ |
|result|boolean|接口调用结果(true:成功，false:失败)|
|message|string 或 { [ key : string ] : string[ ] }|接口提示信息|
|datas|any|接口返回数据,可选参数，只有接口调用成功才存在|
|id|number|用于添加类接口，提供新添加数据的ID参数|
</table>

#### 配置文件
--------------------------------
http请求的默认配置在 app/config/http.config.ts

```typescript
/*HTTP请求配置文件*/
export const HttpConfig = {

    // 服务器HTTP请求地址
    SERVER_URL: 'http://127.0.0.1:4200',

    // 服务器其他资源地址
    SOURCE_URL: 'http://ng.cool1024.com',

    // 请求超时设置:毫秒
    REQUEST_TIMEOUT: 5000,

    // 错误弹窗显示时间
    TOAST_ERROR_TIME: 3000,

    // RSA 公钥
    RSA_PUBLIC_KEY: ``,

    // RSA 私钥
    RSA_PRIVATE_KEY: ``,
};
```
>**参数**

>*SERVER_URL* : 所有用request服务发送的请求,都会使用这个请求地址作为基础地址,最终发送的请求链接为 基础地址 + 接口地址,如 this.requestService.get('/user/info')得到的最终请求地址为 http://127.0.0.1:4200 + /user/info = http://127.0.0.1:4200/user/info ,大多数时候我们都是用这个基础地址发送请求,但是存在需要修改基础地址的时候,如果需要,可以使用request服务中的withConfig来获取一个新的request服务,新服务可以重新设置请求的基础地址,和其他参数,且不会影响其它请求(注意,新请求时完全独立的,并可以一直使用下去)

>*SOURCE_URL* : 这个参数不是强制设定的,我们大多数时候访问图片,视频等静态资源都是从同一个服务器地址获取,这里集中设置一个资源地址方便集中管理和修改

>*REQUEST_TIMEOUT* : 很多时候发送请求的时候,会存在长时间没有响应;为了避免长时间等待,可以设置一个请求超时,所有请求只要超过了这个时间就会强制结束,并会得到超时提示信息,我们可以在subscribe中获取这个错误(错误保存在ApiData中)

>*TOAST_ERROR_TIME* : 每次request服务发送请求失败时，都会由拦截器截获这个异常，并在界面显示一个提示消息，这个参数用于配置弹窗显示时间

>*RSA_PUBLIC_KEY* : Http请求加密公钥

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
    url: string, 
    params: { [key: string]: number | string },
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
upload(
    url: string, 
    files: Array<{ name: string, files: Array<File> }>,
    onprogress: (value: number) => void, 
    final: (value: ApiData) => void):void
```
>**参数**

>*url* : 请求地址

>*files* : 上传的文件列表，参考上面的files方法

>*onprogress* : 上传中用于获取上传进度的方法，value为0-100的整数

>*final* : 上传结束后的回掉方法，value为服务器响应

>**注意**

><span class="text-danger">这个方法不适合对接第三方上传，对响应格式有严格要求(ApiData)</span>

#### 配置一个新的request服务
------------------------------
```typescript
// 获取一个附带额外自定义请求头的request服务
withHeader(
    headers: { [key: string]: string }, 
    cover = false
) => RequestService 
```
>**参数**

>*headers* : 需要追加的请求头，一个JSON对象

>*cover* : 是否覆盖原有请求头，（原有请求头为权限令牌等参数）

```typescript
// 获取一个不带默认权限令牌的request服务
withoutHeader() => RequestService 
```
>**参数**

>无参数

```typescript
// 获取一个重新配置的request服务
withConfig(
    config: { 
        url?: string,
        withoutHeader?: boolean, 
        headers?: { [key: string]: string }, 
        cover?: boolean 
    }
) => RequestService 
```
>**参数**

>*url* : 重新设置的API请求基础地址

>*withoutHeader* : 是否禁用附带默认请求头（权限令牌），true:不使用，false:使用

>*headers* : 附加自定义请求头部（同withHeader方法）

>*cover* : 是否覆盖原有请求头，（原有请求头为权限令牌等参数）

>**注意**

>如果使用了withoutHeader,将会禁用请求头，headers,cover都将失效

##### 参考示例
```typescript
// 重新设置API请求基础地址
this.requestService.withConfig({ url: 'http://127.0.0.1' }).post('/signin').subscribe(res => {
    console.log(res);
});

// 不要发送默认请求头
this.requestService.withoutHeader().post('/signin').subscribe(res => {
    console.log(res);
});

// 附带自定义请求头部
this.requestService.withHeader({
    one:'header one',
    two:'header two'
}).post('/signin').subscribe(res => {
    console.log(res);
});
```
