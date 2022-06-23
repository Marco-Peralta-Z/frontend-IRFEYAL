import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CrearEditarComponent } from './pages/crear-editar/crear-editar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { PrestarComponent } from './pages/prestar/prestar.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path:'crear',
        component: CrearEditarComponent
      },
      {
        path:'prestar',
        component: PrestarComponent
      },
      {
        path:'listar',
        component: ListarComponent
      },
      {
        path:'editar/:id',
        component: CrearEditarComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'listar'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticulosRoutingModule { }
