import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUsuarioService } from 'src/app/Servicio/roles_Usuario/service-usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private userServis: ServiceUsuarioService) { }
  authValidate: boolean = false;
  Username: String = "";
  ngOnInit(): void {


    let v = localStorage.getItem("Username")
    this.Username = String(v);
    this.authValidate=Boolean(this.userServis.dato);

  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  cerrarSesion() {
    this.userServis.dato = false;
  }

}
