import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Path } from 'src/app/config';
import { ServiceUsuarioService } from 'src/app/Servicio/roles_Usuario/service-usuario.service';
import { item } from 'src/app/material/item';
@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

    path=Path.url;
    constructor(private router: Router, private userServis: ServiceUsuarioService) { }
    items: MenuItem[] = [];
    authValidate: boolean = false;
    ngOnInit() {
        this.authValidate = Boolean(this.userServis.dato);

       this.items=item.items;
    }




}
