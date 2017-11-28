import { Component, OnInit } from '@angular/core';
import { Menus } from '../../../../config/menu.config';

@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.css']
})
export class MenuManagerComponent implements OnInit {

  items = [1, 2, 3, 4, 5];

  menus = Menus;

  constructor() { }

  ngOnInit() { }
}
