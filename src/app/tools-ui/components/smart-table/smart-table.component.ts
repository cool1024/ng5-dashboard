import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { DefaultSmartConfig } from './smart-table.config';
import { SmartConfig } from './smart-table.interface';
import { Pagination } from '../../classes/pagination.class';
import { SearchParams } from '../../classes/search.class';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'ts-smart-table',
    templateUrl: './smart-table.component.html',
    styleUrls: ['./smart-table.component.css'],
    exportAs: 'tsSmartTable'
})
export class SmartTableComponent implements OnInit {

    @ViewChild('loading') flash: any;
    @Input() config: SmartConfig;
    @Input() set datas(datas: { [key: string]: any }[]) { this.list = datas; this.debug = true; }

    search: SearchParams;
    pagination: Pagination;
    list: { [key: string]: any }[];
    debug: boolean;

    get theads(): string[] {
        return this.config.theads;
    }

    get rows(): any[] {
        return [];
    }

    constructor(private domSanitizer: DomSanitizer) {
        this.config = new DefaultSmartConfig();
        this.pagination = new Pagination();
        this.search = new SearchParams({}, -1);
        this.list = [];
        this.debug = false;
    }

    ngOnInit() {
        this.pagination.limit = this.config.page.limit;
        this.pageChanged();
    }

    toSaveHtml(html: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }

    doFunc(item: any, func: (item: any) => Observable<void> | void) {
        const obs = func(item);
        if (obs instanceof Observable) {
            obs.subscribe(() => this.pageChanged());
        }
    }

    pageChanged() {
        if (this.debug === true) { return; }
        this.flash.loading();
        this.config.loadConfig.httpService.get(this.config.loadConfig.url, this.pagination.getpageDataWith(this.search.values), false)
            .subscribe(res => {
                if (res.result) {
                    this.list = res.datas.rows;
                    this.pagination.total = res.datas.total;
                }
                this.flash.complete();
            });
    }

    resetSearch() {
        this.search.clean();
        this.pagination.page = 1;
        this.pageChanged();
    }

    doSearch() {
        this.pagination.page = 1;
        this.pageChanged();
    }

    goPage(page: NgModel) {
        if (!isNaN(page.value) && page.value > 0 && page.value <= this.pagination.maxPage) {
            this.pagination.page = page.value;
            this.pageChanged();
        }
    }
}
