import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD

const routes: Routes = [
  //Aqui Rutas
];
=======
import { KitComponent } from 'src/app/pages/inventarios/inventariomodulos/kit/kit.component';
import { ArticuloComponent } from 'src/app/pages/inventarios/invnetarioarticulos/articulo/articulo.component';

const routes: Routes = [
  //Aqui Rutas
  {
  path:'',children:[
    {path:'kit',component:KitComponent},
    {path:'articulo',component:ArticuloComponent},
    
    
]}];
>>>>>>> d708704c4e06365b382dc7d2e79ac898ca26f80e

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
