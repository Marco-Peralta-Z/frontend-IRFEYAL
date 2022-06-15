import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesRegistroComponent } from 'src/app/pages/tutorias/actividadesRegistro/actividadesRegistro.component';

const routes: Routes = [
  //Aqui Rutas
  {
    path: '', 
    children: [
      {path:'tutorias/actividadesRegistro',component:ActividadesRegistroComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutoriasRoutingModule { }
