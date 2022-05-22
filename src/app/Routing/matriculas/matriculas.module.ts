import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatriculasRoutingModule } from './matriculas-routing.module';
import { ListarEstudianteComponent } from '../../pages/matricula/estudiante/listar-estudiante/listar-estudiante.component';
import { AgregarEstudianteComponent } from '../../pages/matricula/estudiante/agregar-estudiante/agregar-estudiante.component';
import { ListarMatriculaComponent } from '../../pages/matricula/matricula/listar-matricula/listar-matricula.component';
import { AgregarMatriculaComponent } from '../../pages/matricula/matricula/agregar-matricula/agregar-matricula.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListarEstudianteComponent,
    AgregarEstudianteComponent,
    ListarMatriculaComponent,
    AgregarMatriculaComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    MatriculasRoutingModule
    
  ]
})
export class MatriculasModule { }
