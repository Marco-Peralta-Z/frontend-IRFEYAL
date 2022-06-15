import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComprobanteComponent } from 'src/app/pages/pagos/comprobante/crear-comprobante/crear-comprobante.component';
import { ListarComprobantesComponent } from 'src/app/pages/pagos/comprobante/listar-comprobantes/listar-comprobantes.component';

const routes: Routes = [
  //Aqui Rutas

  {path:'',
    children:[
      {
        path: 'listarComprobante',
        component: ListarComprobantesComponent
      },
      {
        path: 'crearComprobante',
        component: CrearComprobanteComponent
      }
      
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosRoutingModule { }
