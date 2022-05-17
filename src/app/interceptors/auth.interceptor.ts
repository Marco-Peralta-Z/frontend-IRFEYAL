import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../Servicio/auth/auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError( e => {
        // no esta autentificado
        if( e.status == 401 ){
          if ( this._authService.isAuthenticated() ) {
            this._authService.logOut();
          } 
          this._router.navigate(['/login']);
        }
        // no tiene acceso a los endpoints
        if ( e.status == 403 ) {
          Swal.fire('Oops!', 'No tienes acceso', 'warning');
          this._router.navigate(['/home']);
        }
        return throwError(e);
      })
    );
  }
}
