import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RequestService } from '../../../../dashboard/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
declare const window: any;
declare const Prism: any;
const LANGUAGE = {
    html: Prism.languages.html,
    typescript: Prism.languages.typescript,
    javascript: Prism.languages.javascript,
    xml: Prism.languages.xml,
    php: Prism.languages.php,
};

@Component({
    templateUrl: './simple.component.html',
    styles: [
        `:host ::ng-deep .markdown-blockquote {
      border-left: 3px solid #e1e1e1 !important;
      padding-left: 10px !important;
    }`,
        `:host ::ng-deep code{
      font-size: 14px !important;
    }`
    ],
    providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class SimpleComponent implements OnInit {

    markdown: SafeHtml | string = '';

    constructor(
        private requestService: RequestService,
        private activatedRoute: ActivatedRoute,
        private domSanitizer: DomSanitizer,
        private location: Location) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {

            this.requestService.withConfig({ url: '' }).text(`assets/docs/${params.docs}.md`).subscribe(res => {
                const renderer = new window.marked.Renderer();

                renderer.code = (code: string, language: string): string => {
                    const _code = window.Prism.highlight(code, LANGUAGE[language] || LANGUAGE.html);

                    const line_length = _code.split('\n').length;
                    let line_code = '<span class="line-numbers-rows">';
                    for (let i = 0; i < line_length; i++) {
                        line_code += '<span></span>';
                    }
                    line_code += '</span">';
                    return `<pre class='line-numbers language-${language} rounded-0'><code>${_code}${line_code}</code></pre>`;
                };

                renderer.blockquote = (quote: string): string => {
                    return `<blockquote class="markdown-blockquote">${quote}</blockquote>`;
                };

                renderer.table = (header: string, body: string): string => {
                    return `<table class="table table-striped table-inverse table-bordered">
                    <thead>${header}<thead><tbody>${body}<tbody></table>`;
                };

                const markdown = window.marked(res || '', { renderer: renderer });

                this.markdown = this.domSanitizer.bypassSecurityTrustHtml(markdown);

            });
        });
    }
    back() {
        this.location.back();
    }

}
