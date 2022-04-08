import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestorComponent } from './gestor/gestor.component';

const routes: Routes=[
  {
    path:'',
    component:GestorComponent,
    children:[
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
        redirectTo:''
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
