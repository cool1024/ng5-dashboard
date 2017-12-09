import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RequestService } from '../../../../dashboard/services/request.service';
import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {

    detail: { position?: number, name?: string, weight?: number, symbol?: string, thumb?: string } = {};

    constructor(private activatedRoute: ActivatedRoute, private request: RequestService) { }

    ngOnInit() {
        this.activatedRoute.paramMap
            .switchMap(params => this.request.get('/assets/json/detail-api.json', { id: params.get('id') }))
            .subscribe(res => {
                this.detail = res.datas;
            });
    }

}
