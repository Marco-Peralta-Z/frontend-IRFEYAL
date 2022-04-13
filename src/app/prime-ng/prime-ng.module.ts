import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SplitterModule } from 'primeng/splitter';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogModule } from 'primeng/dialog';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { KeyFilterModule } from 'primeng/keyfilter';
import { BlockUIModule } from 'primeng/blockui';
import { FocusTrapModule } from 'primeng/focustrap';
import { SplitButtonModule } from 'primeng/splitbutton';


@NgModule({
  
  exports:[
    SplitterModule,
    PanelMenuModule,
    DialogModule,
    MegaMenuModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    OverlayPanelModule,
    DividerModule,
    TooltipModule,
    KeyFilterModule,
    BlockUIModule,
    FocusTrapModule,
    SplitButtonModule
  ]
  
})
export class PrimeNgModule { }
