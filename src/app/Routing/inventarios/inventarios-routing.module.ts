import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticuloComponent } from 'src/app/pages/inventarios/invnetarioarticulos/articulo/articulo.component';

const routes: Routes = [
  //Aqui Rutas
  {
  path:'',children:[
    {path:'articulo',component:ArticuloComponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
