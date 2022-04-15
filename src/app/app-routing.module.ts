import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './aouth/login/login.component';
import { HeaderComponent } from './modulos/header/header.component';
import { SidenavComponent } from './modulos/sidenav/sidenav.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { ArticuloComponent } from './pages/modulo_inventario/articulo/articulo.component';
import { CategoriaComponent } from './pages/modulo_inventario/categoria/categoria.component';


const routes: Routes = [
  //Inicio Rutas Principales
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'sidenav', component: SidenavComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  //Fin Rutaas Principal
  //Inicio Inventario
  { path: 'inventario/categoria', component: CategoriaComponent },
  { path: 'inventario/articulo', component: ArticuloComponent },

  //Find Inventario



  //Toda ruta se debere inicializar por encima de esta ruta
  { path: '**', pathMatch: 'full', component: Error404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
