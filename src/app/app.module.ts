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
<<<<<<< HEAD
import { CategoriaComponent } from './pages/modulo_inventario/categoria/categoria.component';
import { ArticuloComponent } from './pages/modulo_inventario/articulo/articulo.component';
=======
>>>>>>> 1ebe6a5d3eeb9340f753f6e26491b2731b0b395c
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
import { PeriodoComponent } from './pages/parametrizacion/periodo/periodo.component';
import { MallaComponent } from './pages/parametrizacion/malla/malla.component';
import { AsignaturasComponent } from './pages/parametrizacion/asignaturas/asignaturas.component';
import { CursosComponent } from './pages/parametrizacion/cursos/cursos.component';
import { UsuarioComponent } from './pages/rol_usuario/usuario/usuario.component';
<<<<<<< HEAD
import { AsignaturaPeriodoComponent } from './pages/parametrizacion/asignaturas/asignatura_periodo/asignatura-periodo/asignatura-periodo.component';
import { MallaCursoComponent } from './pages/parametrizacion/cursos/malla_curso/malla-curso/malla-curso.component'
=======
=======
import { ArticuloComponent } from './pages/inventarios/invnetarioarticulos/articulo/articulo.component';
import { NuevoKitComponent } from './pages/inventarios/inventariomodulos/componentes/nuevokit/ingresosnuevokit.component';
import { KitComponent } from './pages/inventarios/inventariomodulos/kit/kit.component';
import { TablaAprobacionesKit } from './pages/inventarios/inventariomodulos/componentes/aprobaciones/tabla.component';
import { IngresosKitComponent } from './pages/inventarios/inventariomodulos/componentes/ingresos/ingresoskit.component';
import { UsuarioComponent } from './pages/rol_usuario/usuario/usuario.component';
import { DataTablesModule } from "angular-datatables";
import { ActividadesRegistroComponent } from './pages/tutorias/actividadesRegistro/actividadesRegistro.component';
import { DeudasConsultaComponent } from './pages/tutorias/deudasConsulta/deudasConsulta.component';
import { ReactiveFormsModule } from '@angular/forms';
import localeES from '@angular/common/locales/es-EC';
import { registerLocaleData } from '@angular/common';
import { ListarasistenciaComponent } from './pages/modulo_asistencia/listarasistencia/listarasistencia.component';
import { RegistrarasistenciaComponent } from './pages/modulo_asistencia/registrarasistencia/registrarasistencia.component';
import { GenerarPlanunidadComponent } from './pages/documentos_academicos/generar-planunidad/generar-planunidad.component';
import { RevisarPlanunidadComponent } from './pages/documentos_academicos/revisar-planunidad/revisar-planunidad.component';

>>>>>>> 1ebe6a5d3eeb9340f753f6e26491b2731b0b395c

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    LoginComponent,
    HeaderComponent,
    SidenavComponent,
<<<<<<< HEAD
    CategoriaComponent,
    ArticuloComponent,
=======
>>>>>>> 1ebe6a5d3eeb9340f753f6e26491b2731b0b395c
    PeriodoComponent,
    MallaComponent,
    AsignaturasComponent,
    CursosComponent,
    UsuarioComponent,
    AsignaturaPeriodoComponent,
    MallaCursoComponent

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
    AsistenciaRoutingModule,
    DocumentacionAcademicosRoutingModule,
    InventariosRoutingModule,
    MatriculasRoutingModule,
    PagosRoutingModule,
    RolesRoutingModule,
    SecretariaRoutingModule,
    TutoriasRoutingModule,

    //Importar de encima de este Routin
    ErrorRoutingModule

  ],
  providers: [DatePipe, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
