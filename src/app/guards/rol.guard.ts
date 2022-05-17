import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
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
      this._router.navigate(['login']);
      return false;
    }
    let role = route.data['role'];
    for (let i = 0; i < role.length; i++) {
      if ( this._authService.hasRole(role[i])) {
        return true;
      }
    }
    // si no tiene ningun rol requerido cerramos session
    this._authService.logOut();
    this._router.navigate(['/login']);
    return false;
  }

}
