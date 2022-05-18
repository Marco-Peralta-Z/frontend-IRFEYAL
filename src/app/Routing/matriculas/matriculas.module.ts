import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatriculasRoutingModule } from './matriculas-routing.module';
<<<<<<< HEAD
=======
import { ListarEstudianteComponent } from '../../pages/matricula/estudiante/listar-estudiante/listar-estudiante.component';
import { AgregarEstudianteComponent } from '../../pages/matricula/estudiante/agregar-estudiante/agregar-estudiante.component';
import { ListarMatriculaComponent } from '../../pages/matricula/matricula/listar-matricula/listar-matricula.component';
import { AgregarMatriculaComponent } from '../../pages/matricula/matricula/agregar-matricula/agregar-matricula.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

>>>>>>> d708704c4e06365b382dc7d2e79ac898ca26f80e


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
<<<<<<< HEAD
=======
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
>>>>>>> d708704c4e06365b382dc7d2e79ac898ca26f80e
    MatriculasRoutingModule
  ]
})
export class MatriculasModule { }
