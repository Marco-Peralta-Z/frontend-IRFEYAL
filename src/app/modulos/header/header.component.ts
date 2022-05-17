import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUsuarioService } from 'src/app/Servicio/roles_Usuario/service-usuario.service';
import { AuthService } from '../../Servicio/auth/auth.service';
import { usuario } from '../../Model/rolesTS/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(
    private router: Router, 
    private userServis: ServiceUsuarioService,
    private _authService: AuthService,
  ) { }
  menuacti:boolean=true;
  authValidate: boolean = false;
  Username: String = "";

  ngOnInit(): void {
    this.authValidate = Boolean(this.userServis.dato);

  }

  usuarioGuardado = (): usuario => this._authService.usuario;

  
  toggleSidebar() {
    this.menuacti=!this.menuacti;
    this.toggleSidebarForMe.emit();
  }

  cerrarSesion() {
    this._authService.showLoading(false, 'Cerrando sessión', 'Espere por favor');
    this._authService.logOut();
    setTimeout(() => {
      Swal.close();
      this.router.navigate(['/login']);
    }, 1000);
  }

}
