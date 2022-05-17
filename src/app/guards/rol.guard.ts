import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../Servicio/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {
    
  }
  canActivate(  route: ActivatedRouteSnapshot ): Observable<boolean> | boolean {
    if ( !this._authService.isAuthenticated() ) {
      this._router.navigate(['/login']);
      return false;
    }
    let role = route.data['role'];
    for (let i = 0; i < role.length; i++) {
      // vemos si un rol hace mach con los del token
      if ( this._authService.hasRole(role[i])) {
        return true;
      }
    }
    // si no tiene ningun rol redireccionamos al home
    Swal.fire('Oooops!', 'acceso denegado','warning');
    this._router.navigate(['/home']);
    return false;
  }

}
