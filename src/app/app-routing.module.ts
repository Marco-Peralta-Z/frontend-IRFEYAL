import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './aouth/login/login.component';
import { HeaderComponent } from './modulos/header/header.component';
import { SidenavComponent } from './modulos/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  //Inicio Rutas Principales
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'sidenav', component: SidenavComponent },
<<<<<<< HEAD
=======

  { path: 'tutorias', loadChildren: () => import('./Routing/tutorias/tutorias.module').then(m => m.TutoriasModule) },

  {
    path: 'inventariosModule',
    loadChildren: () => import('./Routing/inventarios/inventarios.module').then(m => m.InventariosModule)
  },

  {
    path: 'matriculaModule',
    loadChildren: () => import('./Routing/matriculas/matriculas.module').then(m => m.MatriculasModule)
  },

  { path: 'asistencia', loadChildren: () => import('./Routing/asistencia/asistencia.module').then(m => m.AsistenciaModule) },

  { path: 'documentosacademicos', loadChildren: () => import('./Routing/documentacion-academicos/documentacion-academicos.module').then(m => m.DocumentacionAcademicosModule) },

>>>>>>> d708704c4e06365b382dc7d2e79ac898ca26f80e
  { path: 'login', pathMatch: 'full', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
