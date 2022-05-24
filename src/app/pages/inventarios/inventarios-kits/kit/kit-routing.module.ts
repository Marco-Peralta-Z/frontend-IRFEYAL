import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KitComponent } from './kit.component';
import { CrearEditarKitComponent } from './pages/crear-editar-kit/crear-editar-kit.component';
import { ListarKitsComponent } from './pages/listar-kits/listar-kits.component';

const routes: Routes = [
  {
    path: '',
    component: KitComponent,
    children:[
      {
        path:'crear',
        component: CrearEditarKitComponent
      },
      {
        path:'listar',
        component: ListarKitsComponent
      },
      {
        path:'editar/:id',
        component: CrearEditarKitComponent
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
export class KitRoutingModule { }
