/*系统主题配置文件*/

/*菜单配置*/
const Menu = {
    baseClass: 'bg-white', // 基础样式类
    angleIconWidth: '30px', // 折叠图标尺寸
    titleIconWidth: '30px', // 菜单图标尺寸
    mainMenuHeight: '40px', // 主菜单高度
    mainMenuClass: 'text-dark', // 主菜单样式类
    mainMenuActiveClass: 'text-info', // 积极状态时主菜单样式类
    borderActiveClass: 'border-info', // 积极状态时左边框样式类
    childMenuHeight: '37px', // 子菜单高度
    childMenuActiveClass: 'text-info', // 积极状态时主菜单样式类
    width: '220px', // 菜单宽度
    marginTop: '60px', // 菜单距离顶部的距离,与headbar高度有关
};

// const Menu = {
//     baseClass: 'bg-secondary text-light', // 基础样式类（背景，字体）
//     angleIconWidth: '30px', // 折叠图标尺寸
//     titleIconWidth: '30px', // 菜单图标尺寸
//     mainMenuHeight: '40px', // 主菜单高度
//     mainMenuClass: 'text-dark', // 主菜单样式类
//     mainMenuActiveClass: 'text-white', // 积极状态时主菜单样式类
//     borderActiveClass: 'border-white', // 积极状态时左边框样式类
//     childMenuHeight: '37px', // 子菜单高度
//     childMenuActiveClass: 'text-white', // 积极状态时主菜单样式类
//     width: '220px', // 菜单宽度
//     marginTop: '60px', // 菜单距离顶部的距离,与headbar高度有关
// };

export const Theme = {
    menu: Menu
};
