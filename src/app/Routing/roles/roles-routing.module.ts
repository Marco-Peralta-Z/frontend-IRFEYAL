import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from 'src/app/pages/rol_usuario/usuario/usuario.component';

const routes: Routes = [
  //Aqui Rutas

  {path:'roles/usuarios', component:UsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
