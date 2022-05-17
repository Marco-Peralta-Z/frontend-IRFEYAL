import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Path } from 'src/app/config';
import { usuario } from 'src/app/Model/rolesTS/usuario';
import { ServiceUsuarioService } from 'src/app/Servicio/roles_Usuario/service-usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Servicio/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public logInForm: FormGroup = this._formBuilder.group({
        cedula: [ '0102184322' , [ Validators.required]],
        password: [ '123' , [ Validators.required]]
    });

    sideBarOpen = true;
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private userservi: ServiceUsuarioService,
        private _authService: AuthService,
        private primengConfig: PrimeNGConfig
    ) { }


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

    logIn = () => {
        if (this.logInForm.valid) {
            let { cedula, password } = this.logInForm.value;
            this._authService.logIn( cedula, password ).subscribe( response => {
                console.log(response);
                this.logeado = false;
                this._authService.guardarToken(response.access_token);
                this._authService.guardarUsuario(response.access_token);
                // this.router.navigate(['home'])
            }, err => {
                console.log(err);
                this.onIsError();
            });
        } else {
            this.onIsError();
        }
    }

}
