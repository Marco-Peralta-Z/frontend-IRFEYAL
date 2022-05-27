import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/Servicio/roles_Usuario/usuario.service';
import { usuario } from '../../../Model/rolesTS/usuario';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['.././usuario.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UsuarioComponent implements OnInit {

  usuarioDialog?: boolean;

  usuarios: usuario[] = [];

  usuario: usuario = new usuario();



  submitted?: boolean;

  constructor(private _usuarioService: UsuarioService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this._usuarioService.getUsuarios().subscribe(res => {
      this.usuarios = res as usuario[];
      console.log(this.usuarios)
    })
  }

  openNew() {
    this.usuario = { contrasenia: '', id_usuario: 0, estUsuario: true, usuario: '', roles: [] };
    this.submitted = false;
    this.usuarioDialog = true;
  }



  editarUsuario(usuario: usuario) {
    this.usuario = { ...usuario };
    this.usuarioDialog = true;
  }
  guardarUsuario() {
    console.log(usuario);
  }

  eliminarUsuario(usuario: usuario) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + usuario.usuario + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarios = this.usuarios.filter(val => val.id_usuario !== usuario.id_usuario);
        this.usuario = { contrasenia: '', id_usuario: 0, estUsuario: true, usuario: '', roles: [] };
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.usuarioDialog = false;
    this.submitted = false;
  }

}
