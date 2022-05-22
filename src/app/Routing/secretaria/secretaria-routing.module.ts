import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignaturasComponent } from 'src/app/pages/parametrizacion/asignaturas/asignaturas.component';

const routes: Routes = [
  //Aqui Rutas
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretariaRoutingModule { }
