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

    // 系统登入配置参数-------------------------------------------------

    // 登入参数
    loginParams: ['account', 'password'],

    // 登入跳转页面
    loginGoPage: '/home',

    // 首页数据展示配置-------------------------------------------------

    // 左侧菜单用户信息，数组第一个参数为头像的字段，第二个为加粗的文字字段，第三个为加粗文字下面的小文字字段
    menuUserParams: ['thumb', 'account', 'rolename'],

    // 左侧菜单默认信息
    menuUserEmpty: ['/assets/image/avatar/1.jpg', 'Admin', 'www.cool1024.com'],

    // 左侧菜单未登入时信息
    menuUserDefault: ['/assets/image/avatar/1.jpg', '未登入', '亲，请先登入'],
};
