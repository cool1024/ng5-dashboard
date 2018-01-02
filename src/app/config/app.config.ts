import { HttpConfig } from './http.config';

/*应用配置文件*/

export const AppConfig = {

    // 系统基础配置参数-------------------------------------------------

    // 系统版本
    version: '2.0.0',

    // 系统标题
    title: 'ToolsUI',

    // 系统图标
    icon: 'favicon.ico',

    // 系统描述
    description: '',

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
    menuUserParams: ['thumb', 'account', 'rolename'],

    // 左侧菜单默认信息
    menuUserEmpty: ['/assets/image/avatar/avatar.jpg', 'Admin', 'www.cool1024.com'],

    // 左侧菜单未登入时信息
    menuUserDefault: ['/assets/image/avatar/avatar.jpg', '未登入', '亲，请先登入'],
};
