import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { canton } from 'src/app/Model/rolesTS/canton';
import { empleado, RespEmpleado } from 'src/app/Model/rolesTS/empleado';
import { extension } from 'src/app/Model/rolesTS/extension';
import { genero } from 'src/app/Model/rolesTS/genero';
import { pais } from 'src/app/Model/rolesTS/pais';
import { parroquia } from 'src/app/Model/rolesTS/parroquia';
import { provincia } from 'src/app/Model/rolesTS/provincia';
import { MensajesSweetService } from 'src/app/Servicio/modulo_invetario/mensajes-sweet.service';
import { DireccionService } from 'src/app/Servicio/roles_Usuario/direccion.service';
import { EmpleadoService } from 'src/app/Servicio/roles_Usuario/empleado.service';
import { EmpresaExtensionService } from 'src/app/Servicio/roles_Usuario/empresa-extension.service';
import { GeneroService } from 'src/app/Servicio/roles_Usuario/genero.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['.././usuario.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class EmpleadoComponent implements OnInit {
  empleadoDialog?: boolean;

  empleados: empleado[] = [];
  empleado: empleado = new empleado();
  generos: genero[] = [];
  paises: pais[] = [];
  provincias: provincia[] = [];
  cantones: canton[] = [];
  parroquias: parroquia[] = [];

  private _empleadoSeleccionado!: empleado;

  extensiones: extension[] = [];
  submitted?: boolean;
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public empleadoForm: FormGroup = this._fb.group({
    //persona
    nombre: [, [Validators.required, Validators.minLength(3)]],
    apellido: [, [Validators.required, Validators.minLength(3)]],
    cedula: [, [Validators.required, Validators.minLength(10)]],
    fechaNacimiento: [, [Validators.required]],
    genero: [, [Validators.required]],
    //direccion
    pais: [, [Validators.required]],
    provincia: [, [Validators.required]],
    canton: [, [Validators.required]],
    parroquia: [, [Validators.required]],
    avPrincipal: [, [Validators.required]],
    avSecundaria: [, [Validators.required]],
    //empleado
    extension: [, [Validators.required]],
    //telefono
    numCelular: [, [Validators.required]],
    telefono: [, [Validators.required]],
    //correo electronico
    correo: [, [Validators.required, Validators.pattern(this.emailPattern)]],
    cargo: [, [Validators.required]],
  });
  constructor(
    private _empleadoService: EmpleadoService,
    private _generoService: GeneroService,
    private _direccionServices: DireccionService,
    private _empresaExtensionService: EmpresaExtensionService,
    private _mensajeSweetService: MensajesSweetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
    this.getGeneros();
    this.getPaises();
    this.getProvincias();
    this.getExtensiones();
  }

  getEmpleados = () => {
    this._empleadoService.getEmpleados().subscribe({
      next: (resp) => (this.empleados = resp),
      error: (err) => (this.empleados = []),
    });
  };

  getGeneros = () => {
    this._generoService.getGeneros().subscribe({
      next: (resp) => (this.generos = resp),
      error: (err) => (this.generos = []),
    });
  };

  getPaises = () =>
    this._direccionServices.getPaises().subscribe({
      next: (resp) => (this.paises = resp),
      error: (err) => (this.paises = []),
    });
  getProvincias = () =>
    this._direccionServices.getProvincias().subscribe({
      next: (resp) => (this.provincias = resp),
      error: (err) => (this.provincias = []),
    });

  getExtensiones = () =>
    this._empresaExtensionService.getExtensiones().subscribe({
      next: (resp) => (this.extensiones = resp),
      error: (err) => (this.extensiones = []),
    });

  editarEmpleado(empleado: empleado) {
    if (empleado.id_empleado == 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se puede editar el Administrador',
        life: 3000,
      });
    } else {
      this.empleadoDialog = true;
      console.log(empleado);

      this._empleadoSeleccionado = empleado;

      this.empleadoForm.setValue({
        //persona
        nombre: empleado.persona.nombre,
        apellido: empleado.persona.apellido,
        cedula: empleado.persona.cedula,
        fechaNacimiento: empleado.persona.fechaNacimiento,
        genero: empleado.persona.genero,
        //direccion
        pais: empleado.direccion.pais,
        provincia: empleado.direccion.provincia,
        canton: empleado.direccion.canton,
        parroquia: empleado.direccion.parroquia,
        avPrincipal: empleado.direccion.avPrincipal,
        avSecundaria: empleado.direccion.avSecundaria,
        //empleado
        extension: empleado.extension,
        //telefono
        numCelular: empleado.telefono.numCelular,
        telefono: empleado.telefono.telefono,
        //correo electronico
        correo: empleado.correo.correo,
        cargo: empleado.cargo,
      });
    }
  }

  seleccionarProvincia(provincia: provincia) {
    console.log(provincia);
    this.cantones = [];
    this.parroquias = [];
    this._direccionServices
      .getCantonesporProvincia(provincia.idProvincia)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.cantones = resp;
        },
        error: (err) => (this.cantones = []),
      });
  }

  seleccionarCanton(canton: canton) {
    console.log(canton);
    this.parroquias = [];
    this._direccionServices.getParroquiasporCanton(canton.idCanton).subscribe({
      next: (resp) => {
        console.log(resp);
        this.parroquias = resp;
      },
      error: (err) => (this.parroquias = []),
    });
  }

  realizarAccion() {
    if (this.empleadoForm.valid) {
      let { extension, cargo } = this.empleadoForm.value;
      this.empleado.extension = extension;
      this.empleado.cargo = cargo;

      let { avPrincipal, avSecundaria, canton, pais, parroquia, provincia } =
        this.empleadoForm.value;
      this.empleado.direccion = {
        avPrincipal,
        avSecundaria,
        canton,
        pais,
        parroquia,
        provincia,
      };

      let { numCelular, telefono } = this.empleadoForm.value;
      this.empleado.telefono = { numCelular, telefono, extension };

      let { correo } = this.empleadoForm.value;
      this.empleado.correo = { correo, extension };

      let { apellido, cedula, fechaNacimiento, nombre, genero } =
        this.empleadoForm.value;
      this.empleado.persona = {
        apellido,
        cedula,
        fechaNacimiento,
        nombre,
        genero,
      };

      if (
        this._empleadoSeleccionado?.id_empleado > 0 &&
        this._empleadoSeleccionado
      ) {
        this.actualizarEmpleado();
      } else {
        this.crearEmpleado();
      }
    } else {
      this.empleadoForm.markAllAsTouched();
    }
  }

  crearEmpleado = () => {
    this._empleadoService.crearEmpleado(this.empleado).subscribe({
      next: (resp: RespEmpleado) => {
        console.log(resp);
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Empleado registrado',
          life: 3000,
        });
        this.getEmpleados();
        this.empleadoForm.reset();
        this.hideDialog();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Al eliminar empleado',
          life: 3000,
        });
      },
    });
  };

  actualizarEmpleado = () => {
    this.empleado.direccion.id_direccion =
      this._empleadoSeleccionado.direccion.id_direccion;
    this.empleado.telefono.id_telefono =
      this._empleadoSeleccionado.telefono.id_telefono;
    this.empleado.correo.id_correo =
      this._empleadoSeleccionado.correo.id_correo;
    this.empleado.persona.id_persona =
      this._empleadoSeleccionado.persona.id_persona;

    this._empleadoService
      .actualizarEmpleado(this._empleadoSeleccionado.id_empleado, this.empleado)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({
            severity: 'success',
            summary: 'Realizado',
            detail: 'Empleado Actualizado',
            life: 3000,
          });
          this.getEmpleados();
          this.empleadoForm.reset();
          this._empleadoSeleccionado = new empleado();
          this.hideDialog();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'al actualizar empleado',
            life: 3000,
          });
        },
      });
  };

  eliminarEmpleado(empleado: empleado) {
    this.confirmationService.confirm({
      message:
        'Desea eliminar el empleado: ' +
        empleado.persona.nombre +
        ' ' +
        empleado.persona.apellido +
        '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._empleadoService
          .eliminarEmpleadoporId(empleado.id_empleado)
          .subscribe({
            next: (resp) => {
              this.empleados = this.empleados.filter(
                (val) => val.id_empleado !== empleado.id_empleado
              );
              this.messageService.add({
                severity: 'success',
                summary: 'Realizado',
                detail: 'Persona Eliminada',
                life: 3000,
              });
            },
            error: (err) => {
              console.log(err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Al eliminar persona',
                life: 3000,
              });
            },
          });
      },
    });
  }

  openNew() {
    this.submitted = false;
    this.empleadoDialog = true;
  }

  hideDialog() {
    this.empleadoForm.reset();
    this.empleadoDialog = false;
    this.submitted = false;
    this._empleadoSeleccionado = new empleado();
  }
  verificarCampo = (campo: string): boolean => {
    return (
      (this.empleadoForm.controls?.[campo].invalid || false) &&
      (this.empleadoForm.controls?.[campo].touched || false)
    );
  };

  get emailErrorMsg(): string {
    const errors = this.empleadoForm.get('correo')?.errors;
    if (errors?.['required']) {
      return 'Correo es requerido';
    } else if (errors?.['pattern']) {
      return 'Correo invalido';
    }

    return '';
  }

  errorMsg(campo: string, num: number): string {
    const errors = this.empleadoForm.get(campo)?.errors;
    if (errors?.['required']) {
      return 'Campo requerido';
    } else if (errors?.['minlength']) {
      return `Requiere mínimo ${num} caracteres`;
    }
    return '';
  }
}
