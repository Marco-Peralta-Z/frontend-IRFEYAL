import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { PrimeNgModule } from '../../../../prime-ng/prime-ng.module';
import { MainComponent } from './main.component';
import { CrearEditarComponent } from './pages/crear-editar/crear-editar.component';
import { ListarComponent } from './pages/listar/listar.component';


@NgModule({
  declarations: [
    MainComponent,
    CrearEditarComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    PrimeNgModule
  ]
})
export class CategoriaModule { }
