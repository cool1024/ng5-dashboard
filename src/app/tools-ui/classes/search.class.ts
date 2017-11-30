export class SearchParams {
    constructor(public params: { [key: string]: string | number }, private emptyNumber = -1) { }
    get values(): { [key: string]: string | number } {
        const params: { [key: string]: string | number } = {};
        for (const key in this.params) {
            if (typeof this.params[key] === 'string') {
                if (!!this.params[key]) { params[key] = this.params[key]; }
            } else if (typeof this.params[key] === 'number') {
                params[key] = this.params[key];
            }
        }
        return params;
    }
    clean() {
        for (const key in this.params) {
            if (typeof this.params[key] === 'string') {
                this.params[key] = '';
            } else if (typeof this.params[key] === 'number') {
                this.params[key] = -1;
            }
        }
    }
}
