import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignaturasComponent } from 'src/app/pages/parametrizacion/asignaturas/asignaturas.component';
import { MallaComponent } from 'src/app/pages/parametrizacion/malla/malla.component';
import { PeriodoComponent } from 'src/app/pages/parametrizacion/periodo/periodo.component';

const routes: Routes = [
  //Aqui Rutas
    {path:'parametrizacion/periodo',component:PeriodoComponent},
    {path:'parametrizacion/malla',component:MallaComponent},
    {path:'parametrizacion/asignatura',component:AsignaturasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
