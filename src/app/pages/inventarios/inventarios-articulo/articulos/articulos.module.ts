import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticulosRoutingModule } from './articulos-routing.module';
import { ListarComponent } from './pages/listar/listar.component';
import { CrearEditarComponent } from './pages/crear-editar/crear-editar.component';
import { PrimeNgModule } from '../../../../prime-ng/prime-ng.module';
import { MainComponent } from './main.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    ListarComponent,
    CrearEditarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArticulosRoutingModule,
    PrimeNgModule,
  ]
})
export class ArticulosModule { }
