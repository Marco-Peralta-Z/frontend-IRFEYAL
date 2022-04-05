import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplitterModule } from 'primeng/splitter';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DropdownModule } from 'primeng/dropdown';
import { DragDropModule } from 'primeng/dragdrop';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { ToolbarModule } from 'primeng/toolbar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { BlockUIModule } from 'primeng/blockui';
import { FocusTrapModule } from 'primeng/focustrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AsignaturaService } from './Servicio/parametrizacion/asignatura.service';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from 'primeng/menubar';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, KeyFilterModule,MegaMenuModule,
    AppRoutingModule, ToastModule, BrowserAnimationsModule,
    SplitterModule,MenubarModule,
    ButtonModule, FocusTrapModule, BlockUIModule,
    InputTextModule, OverlayPanelModule, DividerModule, TooltipModule,
    DialogModule, PanelMenuModule
  ],
  providers: [AsignaturaService, DatePipe, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
