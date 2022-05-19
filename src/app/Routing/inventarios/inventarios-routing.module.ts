import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KitComponent } from 'src/app/pages/inventarios/inventariomodulos/kit/kit.component';
import { ArticuloComponent } from 'src/app/pages/inventarios/invnetarioarticulos/articulo/articulo.component';

const routes: Routes = [
  //Aqui Rutas
  {
  path:'',children:[
    {path:'kit',component:KitComponent},
    {path:'articulo',component:ArticuloComponent},
    
    
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
