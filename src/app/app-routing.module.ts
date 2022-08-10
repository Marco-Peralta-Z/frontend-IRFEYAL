import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { RolGuard } from './guards/rol.guard';

import { HeaderComponent } from './modulos/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './aouth/login/login.component';
import { SidenavComponent } from './modulos/sidenav/sidenav.component';



/**
 * Si desea agregar otro rol de hacerlo asi: "ROLE_" + "nombre del rol de la bd" = 'ROLE_estudiante'
 * Revisar el import.sql del back la tabla roles
 */
const routes: Routes = [
  //Inicio Rutas Principales
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_Administrador', 'ROLE_Secretaria', 'ROLE_Docente', 'ROLE_Coordinador de desarrollo institucional', 'ROLE_Coordinador administrativo', 'ROLE_Coordinador academico'] }
  },
  {
    path: 'header',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_Administrador', 'ROLE_Secretaria', 'ROLE_Docente', 'ROLE_Coordinador de desarrollo institucional', 'ROLE_Coordinador administrativo', 'ROLE_Coordinador academico'] }
  },
  {
    path: 'sidenav',
    component: SidenavComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_Administrador', 'ROLE_Secretaria', 'ROLE_Docente', 'ROLE_Coordinador de desarrollo institucional', 'ROLE_Coordinador administrativo', 'ROLE_Coordinador academico'] }
  },

  {
    path: 'tutorias',
    loadChildren: () => import('./Routing/tutorias/tutorias.module').then(m => m.TutoriasModule),
    canActivate: [AuthGuard, RolGuard],
    data: { role: ['ROLE_Administrador', 'ROLE_Docente'] }
  },

  {
    path: 'inventariosModule',
    loadChildren: () => import('./Routing/inventarios/inventarios.module').then(m => m.InventariosModule),
    canActivate: [AuthGuard, RolGuard],
    data: { role: ['ROLE_Administrador', 'ROLE_Coordinador de desarrollo institucional', 'ROLE_Coordinador administrativo'] }
  },

  {
    path: 'matriculaModule',
    loadChildren: () => import('./Routing/matriculas/matriculas.module').then(m => m.MatriculasModule),
    canActivate: [AuthGuard, RolGuard],
    data: { role: ['ROLE_Administrador', 'ROLE_Secretaria'] }
  },

  {
    path: 'parametrizacion',
    loadChildren: () => import('./Routing/parametrizacion/parametrizacion.module').then(m => m.ParametrizacionModule),
    canActivate: [AuthGuard, RolGuard],
    data: { role: ['ROLE_Administrador', 'ROLE_Coordinador administrativo', 'ROLE_Coordinador academico'] }
  },

  {
    path: 'roles',
    loadChildren: () => import('./Routing/roles/roles.module').then(module => module.RolesModule),
    canActivate: [AuthGuard, RolGuard],
    data: { role: ['ROLE_Administrador'] }
  },

  {
    path: 'asistencia',
    loadChildren: () => import('./Routing/asistencia/asistencia.module').then(m => m.AsistenciaModule),
    canActivate: [AuthGuard, RolGuard],
    data: { role: ['ROLE_Administrador', 'ROLE_Docente'] }
  },

  {
    path: 'documentosacademicos',
    loadChildren: () => import('./Routing/documentacion-academicos/documentacion-academicos.module').then(m => m.DocumentacionAcademicosModule),
    canActivate: [AuthGuard, RolGuard],
    data: { role: ['ROLE_Administrador', 'ROLE_Docente', 'ROLE_Coordinador de area'] }
  },

  {
    path: 'pagos',
    loadChildren: () => import('./Routing/pagos/pagos.module').then(m => m.PagosModule),
    canActivate: [AuthGuard, RolGuard],
    data: { role: ['ROLE_Administrador', 'ROLE_Secretaria'] }
  },

  {
    path: 'secretaria',
    loadChildren: () => import('./Routing/secretaria/secretaria.module').then(m => m.SecretariaModule),
    canActivate: [AuthGuard, RolGuard],
    data: { role: ['ROLE_Administrador', 'ROLE_Secretaria'] }
  },

  { path: 'login', component: LoginComponent },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
