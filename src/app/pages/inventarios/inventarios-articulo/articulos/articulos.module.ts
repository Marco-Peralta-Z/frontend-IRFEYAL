import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticulosRoutingModule } from './articulos-routing.module';
import { ListarComponent } from './pages/listar/listar.component';
import { CrearEditarComponent } from './pages/crear-editar/crear-editar.component';
import { PrimeNgModule } from '../../../../prime-ng/prime-ng.module';
import { MainComponent } from './main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrestarComponent } from './pages/prestar/prestar.component';
import { EditarArticuloComponent } from './pages/editar-articulo/editar-articulo.component';
import { ListaArtPrestadoComponent } from './pages/lista-art-prestado/lista-art-prestado.component';


@NgModule({
  declarations: [
    MainComponent,
    ListarComponent,
    CrearEditarComponent,
    PrestarComponent,
    EditarArticuloComponent,
    ListaArtPrestadoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArticulosRoutingModule,
    PrimeNgModule,
  ]
})
export class ArticulosModule { }
