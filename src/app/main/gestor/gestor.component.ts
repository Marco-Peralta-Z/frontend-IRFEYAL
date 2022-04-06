import { Component } from '@angular/core';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.scss']
})
export class GestorComponent  {
  title = 'frond_ifreyal';
  sideBarOpen=true;

  sideBarToggler(){
      this.sideBarOpen= !this.sideBarOpen;
  }

}
