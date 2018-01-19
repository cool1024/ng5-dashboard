import { Component, OnInit } from '@angular/core';
import { GlobalValueService } from '../../services/global-value.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorConfig = {
    zIndex: 1051,
  };

  constructor(private global: GlobalValueService) { }

  ngOnInit() {
    // console.log(111);
    // this.global.setValue('checkStatus', true);
  }

}
