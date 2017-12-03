import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RequestService } from '../../../../dashboard/services/request.service';
import { ActivatedRoute } from '@angular/router';
declare const window: any;

@Component({
  templateUrl: './simple.component.html',
  styles: [
    `:host ::ng-deep .markdown-blockquote {
      border-left: 3px solid #e1e1e1 !important;
      padding-left: 10px !important;
    }`
  ]
})
export class SimpleComponent implements OnInit {

  markdown: SafeHtml | string = '';

  constructor(private requestService: RequestService, private activatedRoute: ActivatedRoute, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.requestService.text(`/assets/docs/${params.docs}.md`).subscribe(res => {
        const renderer = new window.marked.Renderer();

        // renderer.code = (code: string, language: string): string => {
        //   return `<pre class='language-${language}'><code>${Prism.highlight(code, LANGUAGE[language] || LANGUAGE.html)}</code></pre>`
        // }

        renderer.blockquote = (quote: string): string => {
          return `<blockquote class="markdown-blockquote">${quote}</blockquote>`;
        };

        renderer.table = (header: string, body: string): string => {
          return `<table class="table table-striped table-inverse"><thead>${header}<thead><tbody>${body}<tbody></table>`;
        };

        const markdown = window.marked(res || '', { renderer: renderer });

        this.markdown = this.domSanitizer.bypassSecurityTrustHtml(markdown);

      });
    });
  }

}
