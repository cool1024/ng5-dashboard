import { Component, OnInit } from '@angular/core';
import { TSToastService, TSConfirmService } from './../../../../tools-ui';
@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {

  popoverPosition = 'left';

  constructor(private toastService: TSToastService, private confirmService: TSConfirmService) { }

  ngOnInit() { }

  get confirm(): TSConfirmService {
    return this.confirmService;
  }

  get toast(): TSToastService {
    return this.toastService;
  }
}
