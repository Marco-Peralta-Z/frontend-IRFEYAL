import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { responsive,item } from 'src/app/material/item';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }
  responsiveOptions=responsive.responsiveOptions;
  items=item.items;
  subItems:any[]=[];
  selecMenu:any=null;
  ngOnInit(): void {
    
  }

  RedicMenu(){
    this.router.navigate([this.selecMenu.routerLink]);
  }
  

}
