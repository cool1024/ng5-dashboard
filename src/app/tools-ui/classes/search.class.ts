export class SearchParams {
    constructor(public params: { [key: string]: string | number }) { }
    get values(): { [key: string]: string | number } {
        const params: { [key: string]: string | number } = {};
        for (const key in this.params) {
            if (typeof this.params[key] === 'string') {
                if (!!this.params[key]) { params[key] = this.params[key]; }
            } else {
                params[key] = this.params[key];
            }
        }
        return params;
    }
    clean() {
        for (const key in this.params) {
            if (typeof this.params[key] === 'string') {
                this.params[key] = '';
            } else {
                this.params[key] = -1;
            }
        }
    }
}
