import { Component } from '@angular/core';
import { RegExpService } from '../../../../dashboard/services/regexp.service';

@Component({
    templateUrl: './checkform.component.html',
    styleUrls: ['./checkform.component.css']
})
export class CheckFormComponent {

    constructor(private regexp: RegExpService) { }

    isValid(param: string, type: string): boolean {
        return this.regexp.isRight(param, type);
    }
}
