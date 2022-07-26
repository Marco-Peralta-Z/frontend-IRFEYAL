import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { modulo } from 'src/app/Model/rolesTS/modulo';
import { rol } from 'src/app/Model/rolesTS/rol';
import { ModuloService } from 'src/app/Servicio/roles_Usuario/modulo.service';
import { UsuarioService } from 'src/app/Servicio/roles_Usuario/usuario.service';
import { usuario } from '../../../Model/rolesTS/usuario';
import { EmpleadoService } from '../../../Servicio/roles_Usuario/empleado.service';
import { RolService } from '../../../Servicio/roles_Usuario/rol.service';
import { RespRolUsuario, rolUsuario } from '../../../Model/rolesTS/rolUsuario';
import { rolUsuarioService } from 'src/app/Servicio/roles_Usuario/rolUsuario.service';
import { MensajesSweetService } from 'src/app/Servicio/modulo_invetario/mensajes-sweet.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['.././usuario.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UsuarioComponent implements OnInit {

  empleados: empleado[] = [];
  empleado?: empleado;
  roles: rol[] = [];
  rolesUsuario: rolUsuario[] = [];
  coleccionroles: rol[] = [];
  modulos: modulo[] = [];
  coleccionmodulo: modulo[] = [];
  moduloobj: modulo = new modulo();
  usuarioDialog?: boolean;
  usuarios: usuario[] = [];
  usuario: usuario = new usuario();
  submitted?: boolean;
  rolUsuario: rolUsuario = new rolUsuario();
  displayRol: boolean = false;
  selectUsuario?: usuario;
  selectRol?: rol;



  constructor(private _usuarioService: UsuarioService,
    private _empladoService: EmpleadoService,
    private _rolService: RolService,
    private _rolUsuarioService: rolUsuarioService,
    private _moduloService: ModuloService,
    private _mensajeSweetService: MensajesSweetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.getUsuarios();
    this.getRoles();
    this.getModulos();
  }
  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe(res => {
      this.usuarios = res as usuario[];
      console.log(this.usuarios)
    })

  }

  getEmpleados(event: any) {
    this._empladoService.bucarCedula(event.query.trim()).subscribe({
      next: (resp) => {
        this.empleados = resp;

      },
      error: (err) => {
        this.empleados = [];
      }
    })
  }

  getRoles() {
    this._rolService.getRoles().subscribe({
      next: (resp) => {
        this.roles = resp;
        for (let index in this.roles) {
          if (this.roles[index].descripcion === 'Docente') {
            this.roles[index].descripcion ='Tutor';
          }
        }
        console.log(resp);
      },
      error: (err) => {
        this.roles = [];
      }
    })
  }

  getModulos() {
    this._moduloService.getModulos().subscribe({
      next: (resp) => {
        this.modulos = resp;
      },
      error: (err) => {
        this.modulos = [];
      }
    })
  }
  openNew() {
    this.usuario = { contrasenia: '', id_usuario: 0, estUsuario: true, usuario: '', roles: [] };
    this.submitted = false;
    this.usuarioDialog = true;
  }



  editarUsuario(usuario: usuario) {
    console.log(usuario);
    this.empleado = usuario.empleado;
    usuario.contrasenia = '';
    this.usuario = { ...usuario };
    this.usuarioDialog = true;
  }

  revisarAccion() {
    if (this.usuario.id_usuario) {
      this.actualizazrUsuario();
    } else {
      this.guardarUsuario();
    }
  }

  guardarUsuario() {
    this.usuario.empleado = this.empleado;


    this._usuarioService.crearUsuario(this.usuario).subscribe({
      next: (resp) => {
        console.log(resp);
        this.usuario = new usuario();
        this.getUsuarios();
        this._mensajeSweetService.mensajeOk('Usuario registrado');

      },
      error: (error) => {
        console.log(error);
        this._mensajeSweetService.mensajeError('UPSS!', 'No se pudo registrar el usuario');

      }

    });
  }
  actualizazrUsuario() {
    this.usuario.empleado = this.empleado;


    this._usuarioService.actualizarUsuario(this.usuario.id_usuario, this.usuario).subscribe({
      next: (resp) => {
        console.log(resp);
        this.usuario = new usuario();
        this.getUsuarios();
        this._mensajeSweetService.mensajeOk('Usuario Actualizado');
        this.hideDialog();

      },
      error: (error) => {
        console.log(error);
        this._mensajeSweetService.mensajeError('UPSS!', 'No se pudo actualizar el usuario');
      }

    });
  }



  eliminarUsuario(usuario: usuario) {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar el Usuario: ' + usuario.usuario + '?',
      header: 'Confirma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._usuarioService.eliminarUsuarioporId(usuario.id_usuario).subscribe({
          next: (resp) => {
            this._mensajeSweetService.mensajeOk('Usuario Eliminado');
            this.usuarios = this.usuarios.filter(val => val.id_usuario !== usuario.id_usuario);
            this.usuario = { contrasenia: '', id_usuario: 0, estUsuario: true, usuario: '', roles: [] };
          },
          error: (err) => {
            console.log(err);
            this._mensajeSweetService.mensajeError('Lo siento', 'no se pudo eliminar el usuario');
          }
        })

      }
    });
  }

  hideDialog() {
    this.usuarioDialog = false;
    this.submitted = false;
    this.empleado = new empleado();
    this.rolesUsuario = [];
  }

  agregarRol() {
    if (this.selectRol) {
      let rolUsuario: rolUsuario = {
        estado: true,
        rol: this.selectRol!,
        usuario: this.selectUsuario!
      }
      this._rolUsuarioService.crearRolUsuario(rolUsuario).subscribe({
        next: (resp: RespRolUsuario) => {
          console.log(resp);
          let roles = [...this.selectUsuario!.roles, resp?.rolUsuario];
          //@ts-ignore
          this.selectUsuario.roles = roles;

        },
        error: (error) => console.log(error)

      });
    }
  }

  eliminarRol(rolUsuario: rolUsuario) {
    console.log(rolUsuario);
    this._rolUsuarioService.eliminarRolUsuario(rolUsuario.id_rol_usuario!).subscribe({
      next: (resp) => {
        console.log(resp);
        //@ts-ignore
        this.selectUsuario?.roles = this.selectUsuario?.roles.filter(rolU => rolU.id_rol_usuario !== rolUsuario.id_rol_usuario);
      },
      error: (error) => console.log(error)
    })


  }

  showDialogRol(usuario: usuario) {
    console.log(usuario);

    this.selectUsuario = usuario;
    this.displayRol = true;
  }
  closeDialogRol() {
    this.selectUsuario = new usuario();
    this.selectRol = new rol();
    this.displayRol = false;
  }
}
