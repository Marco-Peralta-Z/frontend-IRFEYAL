import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { ListarComprobantesComponent } from 'src/app/pages/pagos/comprobante/listar-comprobantes/listar-comprobantes.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    ListarComprobantesComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    PagosRoutingModule
  ]
})
export class PagosModule { }
