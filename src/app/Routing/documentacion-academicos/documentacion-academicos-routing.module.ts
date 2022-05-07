import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerarPlanunidadComponent } from 'src/app/pages/documentos_academicos/generar-planunidad/generar-planunidad.component';
import { RevisarPlanunidadComponent } from 'src/app/pages/documentos_academicos/revisar-planunidad/revisar-planunidad.component';

const routes: Routes = [
  //Aqui Rutas
  {
    path: '', children: [
      { path: 'generarplandeunidad', component: GenerarPlanunidadComponent },
      { path: 'revisarplandeunidad', component: RevisarPlanunidadComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentacionAcademicosRoutingModule { }
