import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloRoutingModule } from './modulo-routing.module';
import { PrimeNgModule } from '../../../../prime-ng/prime-ng.module';

import { ModuloComponent } from './modulo.component';
import { CrearEditarComponent } from './pages/crear-editar/crear-editar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModuloComponent,
    CrearEditarComponent,
    ListarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModuloRoutingModule,
    PrimeNgModule,
  ]
})
export class ModuloModule { }
