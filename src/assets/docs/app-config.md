# 应用配置
-----------------------------
## 配置文件
>文件路径:`src/app/config/app.config.ts`

### 参数预览
```typescript
import { HttpConfig } from './http.config';

/*应用配置文件*/

export const AppConfig = {

    // 系统基础配置参数-------------------------------------------------

    // 系统版本
    version: '2.0.0',

    // 系统标题
    title: 'ToolsUI',

    // 系统图标
    icon: '/assets/icon/angular.svg',

    // 系统描述
    description: '暂无描述信息',

    // 系统权限令牌参数-------------------------------------------------

    // 令牌参数
    tokenParams: ['ng-params-one', 'ng-params-two', 'ng-params-three'],

    // 令牌校验地址
    tokenCheckUrl: '/check',

    // 权限错误页面地址
    authErrorUrl: '/401',

    // 系统登入配置参数-------------------------------------------------

    // 登入参数
    loginParams: ['account', 'password'],

    // 附加默认参数
    defaultParams: {
        platform: 'admin'
    },

    // 登入令牌存储
    tokenSave: {
        secret: 'ng-params-one',
        token: 'ng-params-two',
        platform: 'ng-params-three',
    },

    // 登入跳转页面
    loginGoPage: '/home',

    // 登入接口地址(注意，这里的URL必须是完整的URL地址，默认值为 HttpConfig.SERVER_URL + '/login')
    loginUrl: HttpConfig.SERVER_URL + '/signin',

    // 登出接口地址(注意，这里的URL必须是完整的URL地址，默认值为 HttpConfig.SERVER_URL + '/signout')
    outUrl: HttpConfig.SERVER_URL + '/signout',

    // 首页数据展示配置-------------------------------------------------

    // 左侧菜单用户信息，数组第一个参数为头像的字段，第二个为加粗的文字字段，第三个为加粗文字下面的小文字字段
    menuUserParams: ['thumb', 'rolename', 'account'],

    // 左侧菜单默认信息
    menuUserEmpty: ['/assets/image/avatar/avatar.jpg', 'Admin', 'www.cool1024.com'],

    // 左侧菜单未登入时信息
    menuUserDefault: ['/assets/image/avatar/avatar.jpg', '未登入', '亲，请先登入'],
};

```

## 参数说明
1. `loginUrl`:登入接口的地址,配置登入参数使用,只能发送post请求
2. `loginParams`:登入参数名称,有两个元素的数组,第一参数为账户的对应请求参数,第二个参数为密码对应的请求参数
3. `defaultParams`:登入需要附带的参数,只能是常量,可以带多个
4. `loginGoPage`:登入成功后的跳转路由,一般为首页
5. `tokenSave`: 登入成功后需要存储的令牌参数,可以有很多,键名为服务器响应参数(datas)对应的参数名称,键值要保存到本地的参数名

### 列子:

```typescript
 // 登入参数
loginParams: ['account', 'password'],

// 附加默认参数
defaultParams: {
    platform: 'admin'
},

// 登入令牌存储
tokenSave: {
    secret: 'ng-params-one',
    token: 'ng-params-two',
    platform: 'ng-params-three',
},

// 登入跳转页面
loginGoPage: '/home',

// 登入接口地址
loginUrl: 'http://127.0.0.1/signin',

```
>登入时,假设输入账号为admin,密码为123;

1.发送POST请求到`http://127.0.0.1/signin`,携带参数如下

```typescript
{
    "account":"admin", // 这个是账号
    "password":"123", // 这个是密码
    "platform":"admin" // 这个是附加参数,可以添加很多
}
```
2.假设输入的账户密码正确,服务器响应成,返回如下参数

```typescript
{
    "result":true, // 登入是否成功
    "message":".......", // 提示消息
    "datas": {
        secret: '11111111111',
        token: '2222222222',
        platform: 'admin',
    }
}
```

3.把服务器响应的参数保存到本地<br>
键`ng-params-one`对应的值为`11111111111`<br>
键`ng-params-two`对应的值为`2222222222`<br>
键`ng-params-three`对应的值为`admin`<br>

4.跳转到home页面


