/**
 * 组件文件
 * FileFieldComponent
 *
 * @file file-field.compont.ts
 * @author xiaojian
 * @date 2018年02月27日
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FileControlField } from './file.class';

@Component({
    selector: 'ts-form-file',
    template: `
    <img *ngIf="field.isActive()" src="https://www.wufoo.com/images/arrow.png" alt="" class="arrow">
    <div (click)="setFieldActive()" [class.bg-info]="field.isActive()" class="ml-4 p-2 border-hover">
        <p *ngIf="field.isActive()" class="m-0 text-right">
            <button (click)="removeField()" class="btn btn-link text-danger">&times;</button>
        </p>
        <label [class.required-label]="field.required">{{field.title}}</label><br>
        <img *ngIf="field.fileType==='image'" height="100" width="100" src="data:image/svg+xml;utf8;base64,
        PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEd
        lbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdW
        ctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdm
        cgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3
        JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA
        6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5v
        cmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9Ij
        BweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3
        IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2
        h0PSI1MTJweCI+CjxnPgoJPGc+CgkJPHJlY3QgeD0iMSIgeT0iNC41IiBzdHlsZT0iZmlsb
        DojRUNGMEYxOyIgd2lkdGg9IjU1IiBoZWlnaHQ9IjQyIi8+CgkJPHBhdGggc3R5bGU9ImZpb
        Gw6IzU0NUU3MzsiIGQ9Ik01Nyw0Ny41SDB2LTQ0aDU3VjQ3LjV6IE0yLDQ1LjVoNTN2LTQwSD
        JWNDUuNXoiLz4KCTwvZz4KCTxnPgoJCTxyZWN0IHg9IjUiIHk9IjguNSIgc3R5bGU9ImZpbGw
        6IzU0NUU3MzsiIHdpZHRoPSI0NyIgaGVpZ2h0PSIzNCIvPgoJCTxwYXRoIHN0eWxlPSJmaWxs
        OiNFQ0YwRjE7IiBkPSJNNTMsNDMuNUg0di0zNmg0OVY0My41eiBNNiw0MS41aDQ1di0zMkg2V
        jQxLjV6Ii8+Cgk8L2c+Cgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiNGM0Q1NUE7IiBjeD0iMTUiIG
        N5PSIxNy4wNjkiIHI9IjQuNTY5Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojMTFBMDg1OyI
        gcG9pbnRzPSI1MSwzMi42MTEgNTAsMzEuNSAzOCwyMC41IDI3LjUsMzIgMzIuOTgzLDM3LjQ4
        MyAzNyw0MS41IDUxLDQxLjUgICIvPgoJPHBvbHlnb24gc3R5bGU9ImZpbGw6IzI2Qjk5OTsiI
        HBvaW50cz0iNiw0MS41IDM3LDQxLjUgMzIuOTgzLDM3LjQ4MyAyMi4wMTcsMjYuNTE3IDYsND
        AuNSAgIi8+Cgk8Zz4KCQk8Y2lyY2xlIHN0eWxlPSJmaWxsOiM3MUMzODY7IiBjeD0iNDgiIGN
        5PSI0NC41IiByPSIxMiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNTQs
        NDMuNWgtNXYtNWMwLTAuNTUyLTAuNDQ4LTEtMS0xcy0xLDAuNDQ4LTEsMXY1aC01Yy0wLjU1M
        iwwLTEsMC40NDgtMSwxczAuNDQ4LDEsMSwxaDV2NSAgICBjMCwwLjU1MiwwLjQ0OCwxLDEsMX
        MxLTAuNDQ4LDEtMXYtNWg1YzAuNTUyLDAsMS0wLjQ0OCwxLTFTNTQuNTUyLDQzLjUsNTQsNDM
        uNXoiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8
        Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Z
        z4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
        <svg *ngIf="field.fileType==='file'" version="1.1" width="90" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve">
        <path style="fill:#EFCE4A;" d="M55.981,54.5H2.019C0.904,54.5,0,53.596,0,52.481V20.5h58v31.981C58,53.596,57.096,54.5,55.981,54.5z
	"/>
        <path style="fill:#EBBA16;" d="M26.019,11.5V5.519C26.019,4.404,25.115,3.5,24,3.5H2.019C0.904,3.5,0,4.404,0,5.519V10.5v10h58
	v-6.981c0-1.115-0.904-2.019-2.019-2.019H26.019z"/>
        <rect x="34" y="37.5" style="fill:#EDEADA;" width="19" height="12"/>
        <g>
            <path style="fill:#CEC9AE;" d="M38,42.5h4c0.552,0,1-0.447,1-1s-0.448-1-1-1h-4c-0.552,0-1,0.447-1,1S37.448,42.5,38,42.5z"/>
            <path style="fill:#CEC9AE;" d="M46,42.5h1c0.552,0,1-0.447,1-1s-0.448-1-1-1h-1c-0.552,0-1,0.447-1,1S45.448,42.5,46,42.5z"/>
            <path style="fill:#CEC9AE;" d="M49,44.5H38c-0.552,0-1,0.447-1,1s0.448,1,1,1h11c0.552,0,1-0.447,1-1S49.552,44.5,49,44.5z"/>
        </g>
    </svg>

    </div>`,
    styleUrls: ['file-field.component.css'],
})
export class FileFieldComponent implements OnInit {

    @Input() field: FileControlField;
    @Output() fieldChange = new EventEmitter<FileControlField>();
    @Output() activeChange = new EventEmitter<FileControlField>();
    @Output() deleteHandle = new EventEmitter<FileControlField>();

    constructor() { }

    ngOnInit() { }

    /**
     * 设置控件为积极（编辑）状态
     */
    setFieldActive() {
        this.field.setActive();
        this.activeChange.emit(this.field);
    }

    /**
     * 移除控件
     */
    removeField() {
        this.deleteHandle.emit(this.field);
    }

}
