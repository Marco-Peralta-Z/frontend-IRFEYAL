import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Path } from 'src/app/config';
import { usuario } from 'src/app/Model/rolesTS/usuario';
import { ServiceUsuarioService } from 'src/app/Servicio/roles_Usuario/service-usuario.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    sideBarOpen = true;
    constructor(private router: Router,
        private userservi: ServiceUsuarioService,
        private primengConfig: PrimeNGConfig) { }


    logeado: Boolean = new Boolean();
    public isError = false;
    path = Path.url;
    user: usuario = new usuario;
    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.logeado = true;
        this.userservi.dato = false;
        this.router.navigate(['login'])
        this.sideBarOpen = true;
    }

    sideBarToggler() {
        this.sideBarOpen = !this.sideBarOpen;
    }

    onIsError(): void {
        this.isError = true;
        setTimeout(() => {
            this.isError = false;
        }, 4000);
    }

    login() {
        if (this.user.usuario == "") {
            this.onIsError();
        } else {
            this.logeado = false;
            this.userservi.dato = true;
            localStorage.setItem("Username", this.user.usuario.toString())
            this.router.navigate(['home'])
        }
    }

}
