import { Injectable } from '@angular/core';

@Injectable()
export class SelectService {

    formatSelectOptions(datas: { [key: string]: string | number | any }[], maps: { value: string, text: string }): Array<{ value: any, text: string }> {
        const options = new Array<{ value: any, text: string }>();
        datas.forEach(data => {
            options.push({ text: data[maps.text], value: data[maps.value] });
        });
        return options;
    }
}
