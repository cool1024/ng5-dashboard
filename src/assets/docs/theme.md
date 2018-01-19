# 自定义主题
--------------------------
## 配置文件
>文件路径:`src/app/config/theme.config.ts`

## 参数预览
```typescript

/*顶部工具栏*/
const Header = {
    zIndex: 1040, // header图层高度
    titleWidth: '170px', // 标题宽度，与菜单宽度相关
    bgClass: 'bg-info', // header背景样式
};

/*菜单配置*/
const Menu = {
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
```
## 参数说明
>1.顶部工具栏:<br>
主要配置参数为bgClass,参数值为背景样式类,一般为bootstrap内置的背景颜色类(`bg-info,bg-dark,bg-danger`)<br>
2.左侧菜单:<br>
baseClass为菜单背景颜色类,一般为bootstrap内置背景颜色类<br>
mainMenuActiveClass为主菜单被展开时的字体颜色类,一般为bootsrap内置字体颜色类(`text-info,text-dark,text-danger`)<br>
<font color="red">一般的只需要配置颜色即可,不要修改尺寸参数,除非必须的话!!!</font>

## 备注
1. 配置文件中内置了几种颜色主题,可以删除,只保留需要的主题参数
2. 配置文件中常量名称都可以修改如`Danger_Header`,`Danger_Theme`,这些参数都可以改(除了`Themes`)
3. `Themes`常量名称不可以修改,里面的为主题定义,注意`default`为默认主题,系统如果没有设置主题的话会默认加载默认主题,所以default这个属性是必须的;其它如`info`可以删除,也可以修改或者新增,每一个值都是一个完整的主题配置参数

```typescript
export const Themes = {
    'default': Info_Theme, // 默认主题
    'info': Info_Theme, // info 主题
    'secondary': Secondary_Theme, // secondary主题
    'danger': Danger_Theme, // danger主题
};
```

