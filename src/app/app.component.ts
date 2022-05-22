import { Component, OnInit } from '@angular/core';
import { ServiceUsuarioService } from './Servicio/roles_Usuario/service-usuario.service';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './Servicio/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'frond_ifreyal';
    sideBarOpen = true;
    constructor(
        private primengConfig: PrimeNGConfig,
        public authService: AuthService,
    ) { }


    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.sideBarOpen = true;
    }

    sideBarToggler() {
        this.sideBarOpen = !this.sideBarOpen;
    }


}
