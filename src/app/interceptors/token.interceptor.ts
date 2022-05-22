import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Servicio/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this._authService.token;
    if ( token != null ) {
      // pasamos el token por las cabecera de todas la peticiones al servidor
      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer' + token)
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
