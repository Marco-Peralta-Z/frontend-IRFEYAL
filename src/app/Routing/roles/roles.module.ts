import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { UsuarioComponent } from 'src/app/pages/rol_usuario/usuario/usuario.component';
import { EmpleadoComponent } from 'src/app/pages/rol_usuario/empleado/empleado.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuarioComponent,
    EmpleadoComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
