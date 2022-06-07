import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticulosRoutingModule } from './articulos-routing.module';
import { ListarComponent } from './listar/listar.component';
import { CrearEditarComponent } from './crear-editar/crear-editar.component';
import { PrimeNgModule } from '../../../../prime-ng/prime-ng.module';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [
    MainComponent,
    ListarComponent,
    CrearEditarComponent
  ],
  imports: [
    CommonModule,
    ArticulosRoutingModule,
    PrimeNgModule,
  ]
})
export class ArticulosModule { }
