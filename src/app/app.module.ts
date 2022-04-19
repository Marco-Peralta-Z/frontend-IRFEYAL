import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { LoginComponent } from './aouth/login/login.component';
import { HeaderComponent } from './modulos/header/header.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { SidenavComponent } from './modulos/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider'
import { MatMenuModule } from '@angular/material/menu'
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CategoriaComponent } from './pages/modulo_inventario/categoria/categoria.component';
import { ArticuloComponent } from './pages/modulo_inventario/articulo/articulo.component';
import { ParametrizacionRoutingModule } from './Routing/parametrizacion/parametrizacion-routing.module';
import { ErrorRoutingModule } from './Routing/error/error-routing.module';
import { AsistenciaRoutingModule } from './Routing/asistencia/asistencia-routing.module';
import { DocumentacionAcademicosRoutingModule } from './Routing/documentacion-academicos/documentacion-academicos-routing.module';
import { InventariosRoutingModule } from './Routing/inventarios/inventarios-routing.module';
import { MatriculasRoutingModule } from './Routing/matriculas/matriculas-routing.module';
import { PagosRoutingModule } from './Routing/pagos/pagos-routing.module';
import { RolesRoutingModule } from './Routing/roles/roles-routing.module';
import { SecretariaRoutingModule } from './Routing/secretaria/secretaria-routing.module';
import { TutoriasRoutingModule } from './Routing/tutorias/tutorias-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    LoginComponent,
    HeaderComponent,
    SidenavComponent,
    CategoriaComponent,
    ArticuloComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ParametrizacionRoutingModule,
    PrimeNgModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    ErrorRoutingModule,
    AsistenciaRoutingModule,
    DocumentacionAcademicosRoutingModule,
    InventariosRoutingModule,
    MatriculasRoutingModule,
    PagosRoutingModule,
    RolesRoutingModule,
    SecretariaRoutingModule,
    TutoriasRoutingModule
  ],
  providers: [DatePipe, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
