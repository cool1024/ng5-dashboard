import { Component } from '@angular/core';
import {
    SmartConfig,
    DefaultSmartConfig,
    TextRowConfig,
    TextGroupConfig,
    DiyItemConfig,
    AvatarRowConfig,
    AvatarTextRowConfig,
    AvatarDiyRowConfig,
    ButtonsRowConfig,
    SpanRowConfig,
    DiyItemsConfig,
    TdButton,
    TdDropDown,
    TdDiyButton,
} from '../../../../tools-ui';
import { HttpConfig } from '../../../../config/http.config';

@Component({
    selector: 'app-smart',
    templateUrl: './smart.component.html',
    styleUrls: ['./smart.component.css']
})
export class SmartComponent {

    // 测试数据
    datas = [];

    // 表格配置参数
    config_one: DefaultSmartConfig;
    config_two: DefaultSmartConfig;

    constructor() {
        this.datas = [
            {
                text: '1',
                text_group_one: '第一行文本',
                text_group_two: '第二行文本',
                thumb: '/upload/03f77ec6b843ec55dd8d674db6b3a778.jpg',
                status_one: 0,
                status_two: 1,
                status_three: 2,
                diy_one: { name: '获取深层数据' },
                diy_two: '添加自己的样式和标签',
                diy_button: false
            }
        ];

        // 表格一配置参数
        this.config_one = new DefaultSmartConfig();
        this.config_one.appendClass('table-bordered');
        this.config_one.appHeaders('普通文本', '两行文本', '图片', '图片文本', '自定义图片文本', '按钮组');
        this.config_one.appendRows(
            new TextRowConfig('text'),
            new TextGroupConfig(['text_group_one', 'text_group_two'], ['text-danger', 'text-info']),
            new AvatarRowConfig('thumb', HttpConfig.SOURCE_URL),
            new AvatarTextRowConfig(
                ['thumb', 'text_group_one', 'text_group_two'],
                HttpConfig.SOURCE_URL,
                ['rounded-circle', 'text-danger', 'text-info']),
            new AvatarDiyRowConfig(
                ['thumb', 'text_group_one', 'text_group_two'],
                [item => item, item => `<i class="fa fa-fw fa-circle-o"></i>${item}`],
                HttpConfig.SOURCE_URL),
            new ButtonsRowConfig([
                new TdButton('测试按钮', 'btn btn-sm btn-info', item => console.log('按下了测试按钮=>', item)),
                new TdDropDown('操作按钮', ['操作1', '操作2'], 'btn btn-sm btn-dark', [
                    item => console.log('选择了操作1=>', item),
                    item => console.log('选择了操作2=>', item)]),
                new TdDiyButton(item =>
                    `<span class="pointer badge badge-${item.diy_button ? 'success' : 'danger'}">自定义按钮</span>`,
                    item => { console.log('按下了自定义按钮', item); item.diy_button = !item.diy_button; }),
            ]),
        );

        // 表格二配置参数
        this.config_two = new DefaultSmartConfig();
        this.config_two.appendClass('table-bordered');
        this.config_two.appHeaders('状态标签', '状态标签', '状态标签', '自定义标签', '自定义标签', '自定义集合标签');
        this.config_two.appendRows(
            new SpanRowConfig('status_one', [0, 1, 2], ['停用', '待机', '启用'],
                ['badge badge-secondary', 'badge badge-info', 'badge badge-success']),
            new SpanRowConfig('status_two', [0, 1, 2], ['停用', '待机', '启用'],
                ['badge badge-secondary', 'badge badge-info', 'badge badge-success']),
            new SpanRowConfig('status_three', [0, 1, 2], ['停用', '待机', '启用'],
                ['badge badge-secondary', 'badge badge-info', 'badge badge-success']),
            new DiyItemConfig('diy_one', item => item.name),
            new DiyItemConfig('diy_two', item => `<code>${item}</code>`),
            new DiyItemsConfig(['diy_one', 'diy_two'], items => `${items[0].name}<code>${items[1]}</code>`),
        );
    }
}
