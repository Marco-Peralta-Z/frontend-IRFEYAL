import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from 'src/app/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../../Servicio/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public logInForm: FormGroup = this._formBuilder.group({
        cedula: [  , [ Validators.required]],
        password: [  , [ Validators.required]]
    });

    public isError = false;

    public path = Path.url;
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private _authService: AuthService,
    ) { }



    ngOnInit(): void {
        //redireccionamos si el usuario esta loggeado
        if ( this._authService.isAuthenticated()){
            this.router.navigate(['home']);
        }
    }


    onIsError(): void {
        this.isError = true;
        setTimeout(() => {
            this.isError = false;
        }, 3000);
    }

    logIn = () => {
        if (this.logInForm.valid) {
            let { cedula, password } = this.logInForm.value;
            this._authService.showLoading(false, 'Iniciando sesión', 'Espere por favor');
            this._authService.logIn( cedula, password ).subscribe( {
                next: (response) => {
                    this._authService.guardarToken(response.access_token);
                    this._authService.guardarUsuario(response.access_token);
                    Swal.close()
                    this.router.navigate(['/home'])
                }, 
                error: (err) => {
                    console.log(err);
                    Swal.close()
                    this.onIsError();
                }
            });
        } else {
            this.onIsError();
        }
    }

}
