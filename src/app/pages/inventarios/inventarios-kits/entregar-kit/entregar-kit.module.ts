import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntregarKitRoutingModule } from './entregar-kit-routing.module';
import { MainComponent } from './main.component';
import { ListarComponent } from './pages/listar/listar.component';
import { CrearEditarComponent } from './pages/crear-editar/crear-editar.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    ListarComponent,
    CrearEditarComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgModule,
    EntregarKitRoutingModule,
  ]
})
export class EntregarKitModule { }
