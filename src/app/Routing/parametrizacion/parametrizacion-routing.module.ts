import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignaturasComponent } from 'src/app/pages/parametrizacion/asignaturas/asignaturas.component';
import { CursosComponent } from 'src/app/pages/parametrizacion/cursos/cursos.component';
import { TutorComponent } from 'src/app/pages/parametrizacion/cursos/malla_curso/tutor/tutor.component';
import { HorarioCreateComponent } from 'src/app/pages/parametrizacion/horario/horario-create/horario-create.component';
import { HorarioComponent } from 'src/app/pages/parametrizacion/horario/horario/horario.component';
import { MallaComponent } from 'src/app/pages/parametrizacion/malla/malla.component';
import { MallaCreateComponent } from 'src/app/pages/parametrizacion/malla/select-malla/malla-create/malla-create.component';
import { PeriodoCreateComponent } from 'src/app/pages/parametrizacion/periodo/periodo-create/periodo-create/periodo-create.component';
import { PeriodoComponent } from 'src/app/pages/parametrizacion/periodo/periodo.component';

const routes: Routes = [
  //Aqui Rutas
  {
    path: '',
    children: [
      { path: 'periodo', component: PeriodoComponent },
      { path: 'malla', component: MallaComponent },
      { path: 'asignatura', component: AsignaturasComponent },
      { path: 'curso', component: CursosComponent },
      { path: 'curso/tutor', component: TutorComponent },
      { path: 'periodo/new', component: PeriodoCreateComponent },
      { path: 'malla/new', component: MallaCreateComponent },
      { path: 'horario', component: HorarioComponent },
      { path: 'horario/create', component: HorarioCreateComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
