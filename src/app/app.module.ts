import { NgModule, LOCALE_ID } from '@angular/core';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';

// interceptores
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { ParametrizacionRoutingModule } from './Routing/parametrizacion/parametrizacion-routing.module';
import { ErrorRoutingModule } from './Routing/error/error-routing.module';
import { AsistenciaRoutingModule } from './Routing/asistencia/asistencia-routing.module';
import { DocumentacionAcademicosRoutingModule } from './Routing/documentacion-academicos/documentacion-academicos-routing.module';
import { InventariosRoutingModule } from './Routing/inventarios/inventarios-routing.module';
import { PagosRoutingModule } from './Routing/pagos/pagos-routing.module';
import { RolesRoutingModule } from './Routing/roles/roles-routing.module';
import { TutoriasRoutingModule } from './Routing/tutorias/tutorias-routing.module';
import { PeriodoComponent } from './pages/parametrizacion/periodo/periodo.component';
import { MallaComponent } from './pages/parametrizacion/malla/malla.component';
import { AsignaturasComponent } from './pages/parametrizacion/asignaturas/asignaturas.component';
import { CursosComponent } from './pages/parametrizacion/cursos/cursos.component';
import { DataTablesModule } from "angular-datatables";
import { ActividadesRegistroComponent } from './pages/tutorias/actividadesRegistro/actividadesRegistro.component';
import { ReactiveFormsModule } from '@angular/forms';
import localeES from '@angular/common/locales/es-EC';
import { registerLocaleData } from '@angular/common';
import { ListarasistenciaComponent } from './pages/modulo_asistencia/listarasistencia/listarasistencia.component';
import { RegistrarasistenciaComponent } from './pages/modulo_asistencia/registrarasistencia/registrarasistencia.component';
import { GenerarPlanunidadComponent } from './pages/documentos_academicos/generar-planunidad/generar-planunidad.component';
import { RevisarPlanunidadComponent } from './pages/documentos_academicos/revisar-planunidad/revisar-planunidad.component';
import { HorarioCreateComponent } from './pages/parametrizacion/horario/horario-create/horario-create.component';
import { PeriodoCreateComponent } from './pages/parametrizacion/periodo/periodo-create/periodo-create/periodo-create.component';
import { SelectMallasComponent } from './pages/parametrizacion/malla/select-malla/select-mallas/select-mallas.component';
import { MallaCreateComponent } from './pages/parametrizacion/malla/select-malla/malla-create/malla-create.component';
import { HorarioComponent } from './pages/parametrizacion/horario/horario/horario.component';
import { TutorComponent } from './pages/parametrizacion/cursos/malla_curso/tutor/tutor.component';
import { MallaCursoComponent } from './pages/parametrizacion/cursos/malla_curso/malla-curso/malla-curso.component'
import { AsignaturaPeriodoComponent } from './pages/parametrizacion/asignaturas/asignatura_periodo/asignatura-periodo/asignatura-periodo.component';


registerLocaleData(localeES);
// ------------------------------------
@NgModule({
  declarations: [
    AppComponent,
    MallaCursoComponent,
    TutorComponent,
    PeriodoCreateComponent,
    SelectMallasComponent,
    AsignaturaPeriodoComponent,
    MallaCreateComponent,
    HorarioComponent,
    ActividadesRegistroComponent,
    HomeComponent,
    Error404Component,
    LoginComponent,
    HeaderComponent,
    SidenavComponent,
    PeriodoComponent,
    MallaComponent,
    AsignaturasComponent,
    CursosComponent,
    ListarasistenciaComponent,
    RegistrarasistenciaComponent,
    GenerarPlanunidadComponent,
    HorarioCreateComponent,
    RevisarPlanunidadComponent,

  ],
  imports: [
    BrowserModule,
    DataTablesModule,
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
    PagosRoutingModule,
    RolesRoutingModule,
    TutoriasRoutingModule,
    ReactiveFormsModule,

    //Importar de encima de este Routin
    ErrorRoutingModule

  ],
  providers: [DatePipe, { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'es-EC' },
    // configuro los interceptores en el main de la app
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
