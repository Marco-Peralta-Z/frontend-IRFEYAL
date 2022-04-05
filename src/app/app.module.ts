import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { DropdownModule } from 'primeng/dropdown';
// import { DragDropModule } from 'primeng/dragdrop';

// import { SplitButtonModule } from 'primeng/splitbutton';
// import { MultiSelectModule } from 'primeng/multiselect';
// import { AccordionModule } from 'primeng/accordion';
// import { FileUploadModule } from 'primeng/fileupload';
// import { FormsModule } from '@angular/forms';
// import { CalendarModule } from 'primeng/calendar';
// import { TableModule } from 'primeng/table';
// import { InputMaskModule } from 'primeng/inputmask';
// import { ToolbarModule } from 'primeng/toolbar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AsignaturaService } from './Servicio/parametrizacion/asignatura.service';

import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from './material/material.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    MaterialModule,
    PrimeNgModule, 
    AppRoutingModule
  ],
  providers: [AsignaturaService, DatePipe, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
