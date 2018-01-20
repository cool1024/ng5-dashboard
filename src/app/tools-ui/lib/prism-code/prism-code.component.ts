
import { Component, OnChanges, Input, ViewChild, SimpleChanges } from '@angular/core';
declare const Prism: any;

const LANGUAGE = {
    html: Prism.languages.html,
    typescript: Prism.languages.typescript,
    javascript: Prism.languages.javascript,
    xml: Prism.languages.xml,
    php: Prism.languages.php,
};

export const CODE_LANGUAGE = {
    html: 'html',
    typescript: 'typescript',
    javascript: 'javascript',
    xml: 'xml',
    php: 'php',
};

@Component({
    selector: 'ts-prism-code',
    template: `<pre class="line-numbers {{'language-'+language}} rounded-0"
                    [ngStyle]="codeStyle||{}"><code class="{{'language-'+language}}" #pad></code></pre>`
})
export class PrismCodeComponent implements OnChanges {

    @Input() language: string;
    @Input() code: string;
    @Input() codeStyle: { [key: string]: string };
    @ViewChild('pad') codePad: any;

    constructor() {
        this.language = 'html';
    }

    ngOnChanges(changes: SimpleChanges) {
        const language = changes.language ? changes.language.currentValue : 'html';
        const _code: string = Prism.highlight(this.code || '', LANGUAGE[language]);
        const line_length = _code.split('\n').length;
        let line_code = '<span class="line-numbers-rows">';
        for (let i = 0; i < line_length; i++) {
            line_code += '<span></span>';
        }
        line_code += '</span">';
        this.codePad.nativeElement.innerHTML = `${_code}${line_code}`;
    }

}
