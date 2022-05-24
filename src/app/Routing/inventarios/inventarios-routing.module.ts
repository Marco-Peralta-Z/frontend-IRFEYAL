import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticuloComponent } from 'src/app/pages/inventarios/invnetarioarticulos/articulo/articulo.component';

import { KitComponent } from '../../pages/inventarios/kit/kit.component';
import { ModuloComponent } from '../../pages/inventarios/modulo/modulo.component';

const routes: Routes = [
  //Aqui Rutas
  {
  path:'',
  children:[
    {path:'kit',component:KitComponent,},
    {path:'modulo',component:ModuloComponent},
    {path:'articulo',component:ArticuloComponent},  
  ] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
