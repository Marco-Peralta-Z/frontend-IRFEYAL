import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
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
  { path: '**', pathMatch: 'full', component: Error404Component }
=======


const routes: Routes = [
  {
    path:'auth',
    loadChildren:() =>import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'main',
    loadChildren:() =>import('./main/main.module').then(m => m.MainModule)
  }
>>>>>>> c2a466a106516fb1ee616bb59338ba91ef11f4c8

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
