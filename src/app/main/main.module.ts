import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { GestorComponent } from './gestor/gestor.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    GestorComponent,
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimeNgModule,
    MainRoutingModule
  ]
})
export class MainModule { }
