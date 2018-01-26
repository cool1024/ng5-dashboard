import { SmartConfig, TextRowConfig, HttpService, RowItemConfig } from './smart-table.interface';

export class DefaultSmartConfig implements SmartConfig {

    public theads = [];
    public rows = [];
    public tableClass = 'table';
    public loadConfig = {
        httpService: null,
        url: '',
    };
    public page = {
        limit: 20,
    };
    public flash = {
        label: '加载中',
        textClass: 'text-info',
        bgColor: 'rgba(255,255,255,0.8)',
    };

    constructor() { }

    public appHeaders(...theads: string[]) {
        theads.forEach(thead => {
            this.theads.push(thead);
        });
    }

    public appendRows(...rows: RowItemConfig[]) {
        rows.forEach(row => {
            this.rows.push(row);
        });
    }

    public appendClass(className: string) {
        this.tableClass += (' ' + className);
    }

    public setLoad(http: HttpService, url: string) {
        this.loadConfig = {
            httpService: http,
            url: url,
        };
    }

    public setPagination(limit: number) {
        this.page = {
            limit: limit
        };
    }
}
