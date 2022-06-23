import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from "src/app/pages/rol_usuario/empleado/EmpleadoComponent";
import { UsuarioComponent } from 'src/app/pages/rol_usuario/usuario/usuario.component';

const routes: Routes = [
  //Aqui Rutas

  {
    path: '', children:[
      { path:'usuarios',component:UsuarioComponent},
      {path:'empleado',component:EmpleadoComponent},
      {path:'**',redirectTo:'usuarios'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
