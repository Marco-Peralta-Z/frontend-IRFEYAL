import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUsuarioService } from './Servicio/roles_Usuario/service-usuario.service';
import { PrimeNGConfig } from 'primeng/api';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'frond_ifreyal';
    sideBarOpen = true;
    constructor(private router: Router,
        private primengConfig: PrimeNGConfig) { }


    logeado: Boolean = new Boolean();

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.logeado = true;
        this.sideBarOpen = true;
    }

    sideBarToggler() {
        this.sideBarOpen = !this.sideBarOpen;
    }
}
