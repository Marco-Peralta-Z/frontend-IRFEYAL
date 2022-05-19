import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD

const routes: Routes = [
  //Aqui Rutas
=======
import { AgregarEstudianteComponent } from '../../pages/matricula/estudiante/agregar-estudiante/agregar-estudiante.component';
import { ListarEstudianteComponent } from '../../pages/matricula/estudiante/listar-estudiante/listar-estudiante.component';
import { ListarMatriculaComponent } from '../../pages/matricula/matricula/listar-matricula/listar-matricula.component';
import { AgregarMatriculaComponent } from '../../pages/matricula/matricula/agregar-matricula/agregar-matricula.component';


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
        path:'agregarMatricula',
        component:AgregarMatriculaComponent
      },
      {
        path:'listarMatriculas',
        component: ListarMatriculaComponent
      }
    ]
  }
>>>>>>> d708704c4e06365b382dc7d2e79ac898ca26f80e
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculasRoutingModule { }
