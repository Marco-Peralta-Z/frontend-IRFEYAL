import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CrearEditarComponent } from './pages/crear-editar/crear-editar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { PrestarComponent } from './pages/prestar/prestar.component';
import { EditarArticuloComponent } from './pages/editar-articulo/editar-articulo.component';
import { ListaArtPrestadoComponent } from './pages/lista-art-prestado/lista-art-prestado.component';

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
        path:'listarArt',
        component: ListaArtPrestadoComponent
      },
      {
        path:'editar/:id',
        component: CrearEditarComponent
      },
      {
        path:'editarArt/:id',
        component: EditarArticuloComponent
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
