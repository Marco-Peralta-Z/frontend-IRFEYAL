import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEstudianteComponent } from '../../pages/matricula/estudiante/agregar-estudiante/agregar-estudiante.component';
import { ListarEstudianteComponent } from '../../pages/matricula/estudiante/listar-estudiante/listar-estudiante.component';
import { ListarMatriculaComponent } from '../../pages/matricula/matricula/listar-matricula/listar-matricula.component';


const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:'agregarEstudiante',
        component:AgregarEstudianteComponent
      },
      {
        path:'listarEstudiantes',
        component:ListarEstudianteComponent
      },
      {
        path:'listarMatriculas',
        component: ListarMatriculaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculasRoutingModule { }
