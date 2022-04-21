import { NgModule } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogModule } from 'primeng/dialog';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
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
import { CarouselModule } from 'primeng/carousel';
import { SidebarModule } from 'primeng/sidebar';
import { ChipModule } from 'primeng/chip';
import { ScrollTopModule } from 'primeng/scrolltop';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TieredMenuModule } from 'primeng/tieredmenu';

import { TreeModule } from 'primeng/tree';
import { MultiSelectModule } from 'primeng/multiselect';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ImageModule } from 'primeng/image';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { SpeedDialModule } from 'primeng/speeddial';
import { ProgressBarModule } from 'primeng/progressbar';
import {ToolbarModule} from 'primeng/toolbar';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {StepsModule} from 'primeng/steps';
import {ToggleButtonModule} from 'primeng/togglebutton';


@NgModule({

  exports: [
    SplitterModule, AvatarModule, AvatarGroupModule,
    PanelMenuModule, TreeModule, MessagesModule,
    DialogModule, ChipModule, MultiSelectModule,
    MegaMenuModule, TieredMenuModule, MessageModule,
    MenubarModule, CarouselModule, ImageModule,
    InputTextModule, TriStateCheckboxModule,
    ButtonModule, CalendarModule, TimelineModule,
    ToastModule, DropdownModule, CardModule,
    OverlayPanelModule, ListboxModule,
    DividerModule, DataViewModule, SpeedDialModule,
    TooltipModule, TableModule, ProgressBarModule,
    KeyFilterModule, FieldsetModule,ScrollPanelModule,
    BlockUIModule, ScrollTopModule,ToggleButtonModule,
    FocusTrapModule,ToolbarModule,
    SidebarModule,StepsModule,
    SplitButtonModule
  ]

})
export class PrimeNgModule { }
