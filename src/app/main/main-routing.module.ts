import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestorComponent } from './gestor/gestor.component';

const routes: Routes=[
  {
    path:'',
    children:[
      {
        path:'main',
        component:GestorComponent
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path: '**',
        redirectTo:'main'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }
