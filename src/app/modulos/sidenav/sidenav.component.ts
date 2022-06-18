import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Path } from 'src/app/config';
import { ItemsService } from '../../material/items.service';
@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

    constructor(
        private _itemsService: ItemsService,
    ) { }
    path = Path.url;
    items: MenuItem[] = [];

    ngOnInit() {

        this.items = this._itemsService.item();
    }




}
