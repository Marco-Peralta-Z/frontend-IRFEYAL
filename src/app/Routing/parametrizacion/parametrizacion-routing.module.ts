import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticuloComponent } from 'src/app/pages/modulo_inventario/articulo/articulo.component';
import { CategoriaComponent } from 'src/app/pages/modulo_inventario/categoria/categoria.component';

const routes: Routes = [
  //Aqui Rutas
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
