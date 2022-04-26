import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticuloComponent } from 'src/app/pages/inventarios/invnetarioarticulos/articulo/articulo.component';

import { KitComponent } from 'src/app/pages/inventarios/inventariomodulos/kit/kit.component';
import { CategoriaComponent } from 'src/app/pages/inventarios/invnetarioarticulos/categoria/categoria.component';
import { AprobacionesCmponent } from 'src/app/pages/inventarios/inventariomodulos/listar-aprobaciones/aprobacion.component';

const routes: Routes = [
  //Aqui Rutas
  {
  path:'',children:[
    {path:'categoria',component:CategoriaComponent},
    {path:'articulo',component:ArticuloComponent},
    {path:'kit',component:KitComponent},
    {path:'aprobaciones',component:AprobacionesCmponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
