import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUsuarioService } from 'src/app/Servicio/roles_Usuario/service-usuario.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    sideBarOpen = true;
    constructor(private router: Router, private userservi: ServiceUsuarioService) { }
    logeado: Boolean = new Boolean();
    public isError = false;

    ngOnInit(): void {

        this.logeado = true;
        this.userservi.dato = false;
        this.router.navigate(['login'])
        this.sideBarOpen = !this.sideBarOpen;
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
        this.logeado = false;
        this.userservi.dato = true;
        localStorage.setItem("Username", "Usuario de prueba")
        this.router.navigate(['home'])

    }

}
