import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarasistenciaComponent } from 'src/app/pages/modulo_asistencia/registrarasistencia/registrarasistencia.component';
import { ListarasistenciaComponent } from 'src/app/pages/modulo_asistencia/listarasistencia/listarasistencia.component';

const routes: Routes = [
  {
    path:'',
  children:[
    {
      path:'agregarAsistencia',
      component: RegistrarasistenciaComponent 
    },
    {
      path:'listarAsistencia',
      component:  ListarasistenciaComponent
    },
    {
      path:'**',
      redirectTo:'listarAsistencia'
    }
  ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsistenciaRoutingModule { }
