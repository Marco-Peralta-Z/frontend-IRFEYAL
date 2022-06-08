import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  //Aqui Rutas
  {
  path:'',
  children:[
    {
      path:'entregar', 
      loadChildren:  () => import('../../pages/inventarios/inventarios-kits/entregar-kit/entregar-kit.module').then( m => m.EntregarKitModule)
    },
    { 
      path:'kit', 
      loadChildren: () => import('../../pages/inventarios/inventarios-kits/kit/kit.module').then( m => m.KitModule)
    },
    {
      path:'modulo', 
      loadChildren:  () => import('../../pages/inventarios/inventarios-kits/modulo/modulo.module').then( m => m.ModuloModule)
    },
    {
      path:'inventario', 
      loadChildren:  () => import('../../pages/inventarios/inventarios-articulo/articulos/articulos.module').then( m => m.ArticulosModule)
    },
    {
      path:'categoria', 
      loadChildren:  () => import('../../pages/inventarios/inventarios-articulo/categoria/categoria.module').then( m => m.CategoriaModule)
    },
  ] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
