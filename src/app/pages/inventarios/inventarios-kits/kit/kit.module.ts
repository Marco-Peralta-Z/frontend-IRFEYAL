import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PrimeNgModule } from '../../../../prime-ng/prime-ng.module';
import { KitRoutingModule } from './kit-routing.module';

import { CrearEditarKitComponent } from './pages/crear-editar-kit/crear-editar-kit.component';
import { KitComponent } from './kit.component';
import { ListarKitsComponent } from './pages/listar-kits/listar-kits.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearEditarKitComponent,
    KitComponent,
    ListarKitsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KitRoutingModule,
    PrimeNgModule,
  ]
})
export class KitModule { }
