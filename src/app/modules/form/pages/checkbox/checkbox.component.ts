import { Component, OnInit } from '@angular/core';
import { SelectItem } from '../../../../tools-ui';
import { TSModalService, BtnGroupModalComponent } from './../../../../tools-ui';

@Component({
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

    checkboxValue = [1, 3];
    radioValue = 1;

    checkboxs = [{ text: 'Apple', value: 1 }, { text: 'Banana', value: 2 }, { text: 'Carota', value: 3 }];
    radios = [{ text: '先生', value: 1 }, { text: '女士', value: 2 }, { text: '保密', value: 3 }];

    switchValue = true;
    switchString = 'danger';

    items = [
        { text: 'Apple', value: 1 },
        { text: 'Banana', value: 2 },
        { text: 'Carota', value: 3 },
        { text: 'Dinner ', value: 4 },
    ];

    btnGroupModalOptions = {
        title: '点击选中选项',
        label: '关键词',
        placeholder: '请输入关键词',
        okTitle: '确认选择',
        cancelTitle: '取消/返回',
    };

    values = [1];

    moreValues = [];

    get moreItems(): SelectItem[] {
        const list = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
            'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
            'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
            'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
            'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
            'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
            'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
            'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
            'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
            'Zagreb', 'Zaragoza', 'Łódź'];
        const items = new Array<SelectItem>();
        list.forEach((e, i) => {
            items.push({ value: i, text: e });
        });
        return items;
    }

    constructor(private modal: TSModalService) { }

    ngOnInit() { }

    // 弹出多选面板
    showBtnGroupModal() {
        this.modal.create(BtnGroupModalComponent);
        this.modal.modal.instance.items = this.moreItems;
        this.modal.modal.instance.values = this.moreValues;
        this.modal.modal.instance.options = this.btnGroupModalOptions;
        this.modal.open().next(values => {
            this.moreValues = values;
        });
    }

    // 全选
    checkedAllCheckbox() {
        this.checkboxValue = [1, 2, 3];
    }

    // 清空
    cancelAllCheckbox() {
        this.checkboxValue = [];
    }

    // 文本
    checkboxLables(): string {
        const lables = new Array<string>();
        this.checkboxValue.forEach(value => {
            lables.push(this.checkboxs[value - 1].text);
        });
        return lables.join();
    }
}
