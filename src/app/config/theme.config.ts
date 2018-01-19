/*系统主题配置文件*/

// info主题工具栏参数
const Info_Header = {
    zIndex: 1040, // header图层高度
    titleWidth: '170px', // 标题宽度，与菜单宽度相关
    bgClass: 'bg-info', // header背景样式
};

// info主题菜单参数
const Info_Menu = {
    baseClass: 'bg-white', // 基础样式类
    angleIconWidth: '30px', // 折叠图标尺寸
    titleIconWidth: '30px', // 菜单图标尺寸
    mainMenuHeight: '40px', // 主菜单高度
    modelClass: 'text-muted', // 模块名称样式类
    mainMenuClass: 'text-dark', // 主菜单样式类
    mainMenuActiveClass: 'text-info', // 积极状态时主菜单样式类
    borderActiveClass: 'border-info', // 积极状态时左边框样式类
    childMenuHeight: '37px', // 子菜单高度
    childMenuClass: 'text-dark', // 子菜单样式类
    childMenuActiveClass: 'text-info', // 积极状态时主菜单样式类
    width: '220px', // 菜单宽度
    marginTop: '60px', // 菜单距离顶部的距离,与headbar高度有关
};


// secondary主题工具栏参数
const Secondary_Header = {
    zIndex: 1040, // header图层高度
    titleWidth: '170px', // 标题宽度，与菜单宽度相关
    bgClass: 'bg-secondary text-light', // header背景样式
};

// secondary主题菜单参数
const Secondary_Menu = {
    baseClass: 'bg-white', // 基础样式类
    angleIconWidth: '30px', // 折叠图标尺寸
    titleIconWidth: '30px', // 菜单图标尺寸
    mainMenuHeight: '40px', // 主菜单高度
    modelClass: 'text-muted', // 模块名称样式类
    mainMenuClass: 'text-dark', // 主菜单样式类
    mainMenuActiveClass: 'text-secondary', // 积极状态时主菜单样式类
    borderActiveClass: 'border-secondary', // 积极状态时左边框样式类
    childMenuHeight: '37px', // 子菜单高度
    childMenuClass: 'text-dark', // 子菜单样式类
    childMenuActiveClass: 'text-secondary', // 积极状态时主菜单样式类
    width: '220px', // 菜单宽度
    marginTop: '60px', // 菜单距离顶部的距离,与headbar高度有关
};

// danger主题工具栏参数
const Danger_Header = {
    zIndex: 1040, // header图层高度
    titleWidth: '170px', // 标题宽度，与菜单宽度相关
    bgClass: 'bg-danger text-light', // header背景样式
};

// danger主题菜单参数
const Danger_Menu = {
    baseClass: 'bg-white', // 基础样式类
    angleIconWidth: '30px', // 折叠图标尺寸
    titleIconWidth: '30px', // 菜单图标尺寸
    mainMenuHeight: '40px', // 主菜单高度
    modelClass: 'text-muted', // 模块名称样式类
    mainMenuClass: 'text-dark', // 主菜单样式类
    mainMenuActiveClass: 'text-danger', // 积极状态时主菜单样式类
    borderActiveClass: 'border-danger', // 积极状态时左边框样式类
    childMenuHeight: '37px', // 子菜单高度
    childMenuClass: 'text-dark', // 子菜单样式类
    childMenuActiveClass: 'text-danger', // 积极状态时主菜单样式类
    width: '220px', // 菜单宽度
    marginTop: '60px', // 菜单距离顶部的距离,与headbar高度有关
};

// info主题
export const Info_Theme = {
    menu: Info_Menu,
    header: Info_Header
};

// secondary主题
export const Secondary_Theme = {
    menu: Secondary_Menu,
    header: Secondary_Header
};

// danger主题
export const Danger_Theme = {
    menu: Danger_Menu,
    header: Danger_Header
};

export const Themes = {
    'default': Info_Theme, // info作为默认主题
    'info': Info_Theme, // info主题
    'secondary': Secondary_Theme, // secondary主题
    'danger': Danger_Theme, // danger主题
};
