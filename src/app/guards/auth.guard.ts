import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServiceUsuarioService } from '../Servicio/roles_Usuario/service-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userservis: ServiceUsuarioService, private router:Router) { }
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.userservis.authActivate().then(resp => {
        if (!resp) {
          this.router.navigate(['/login'])
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

}
