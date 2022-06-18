import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { responsive } from 'src/app/material/item';
import { ItemsService } from '../../material/items.service';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: MenuItem[] = [];
  constructor(
    private router:Router,
    private _itemsService: ItemsService,
  ) { }

  responsiveOptions=responsive.responsiveOptions;


  subItems:any[]=[];

  selecMenu:any=null;

  ngOnInit(): void {
    this.items = this._itemsService.item().filter( item => item.visible == true);
  }

  RedicMenu(){
    this.router.navigate([this.selecMenu.routerLink]);
  }
  

}
