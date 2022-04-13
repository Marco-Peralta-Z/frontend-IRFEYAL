import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './aouth/login/login.component';
import { HeaderComponent } from './modulos/header/header.component';
import { SidenavComponent } from './modulos/sidenav/sidenav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';





const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'sidenav', component: SidenavComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },

  //Toda ruta debe estar por encima de esta ruta
  { path: '**', pathMatch: 'full', component: Error404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
