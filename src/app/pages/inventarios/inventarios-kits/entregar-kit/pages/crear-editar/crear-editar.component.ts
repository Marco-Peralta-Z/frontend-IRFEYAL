import { Component, OnInit } from '@angular/core';
import { KitService } from '../../../../../../Servicio/modulo_invetario/kit.service';
import { Kit } from '../../../../../../Model/Inventarios/Kit';
import { EstudianteService } from '../../../../../../Servicio/moduloMatricula/estudianteServices/estudiante.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from '../../../../../../Model/Matriculas/estudiante';
import { Aprobacion } from '../../../../../../Model/Inventarios/Aprobacion';
import { EntregarKitService } from '../../../../../../Servicio/modulo_invetario/entregar-kit.service';
import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';
import { AuthService } from '../../../../../../Servicio/auth/auth.service';
import { empleado } from '../../../../../../Model/rolesTS/empleado';
import { ActivatedRoute, Router } from '@angular/router';
import { ResAprobacion } from '../../../../../../Model/Inventarios/interfaces/res_aprobacion.interface';
import { EstudiantePago } from '../../../../../../Model/Inventarios/EstudiantePago';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css'],
})
export class CrearEditarComponent implements OnInit {
  public entregarKitForm: FormGroup = this._formBuilder.group({
    tipoAprobacion: [, [Validators.required]],
    detalleControl: [, [Validators.required]],
    estadoAproba: [false, [Validators.required]],
    fechaAprobacion: [, [Validators.required]],
    estudiantePago: [, [Validators.required]],
  });
  public kits: Kit[] = [];

  public estudiantesPago: EstudiantePago[] = [];

  public id?: number;

  public estudPago?: EstudiantePago;
  public verEstudPago = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _aprobacionService: EntregarKitService,
    private _estudianteService: EstudianteService,
    private _kitService: KitService,
    private _authService: AuthService,
    private _mensajesSweetService: MensajesSweetService
  ) {}

  ngOnInit(): void {
    this.getKits();
    this.getEstudiantesPago();
    this.getAprobacionIdParam();
  }

  getAprobacionIdParam = () => {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.id = +params.get('id')!;
      if (this.id && !isNaN(this.id)) {
        this.getAprobacion(this.id);
      } else {
        this._router.navigate(['/inventariosModule/entregar/crear']);
      }
    });
  };

  getKits = () => {
    this._kitService.getKits().subscribe({
      next: (resp) => {
        this.kits = resp as Kit[];
      },
    });
  };

  getEstudiantesPago = () => {
    this._aprobacionService.getEstudiatesPago().subscribe({
      next: (resp) => {
        this.estudiantesPago = resp;
      },
      error: (error) => {
        this.estudiantesPago = [];
      },
    });
  };

  realizarAccion = () => {
    if (this.entregarKitForm.valid) {
      let {
        tipoAprobacion,
        detalleControl,
        estadoAproba,
        fechaAprobacion,
        estudiantePago,
      } = this.entregarKitForm.value;
      let aprobacion: Aprobacion = {
        tipoAprobacion,
        detalleControl,
        estadoAproba,
        fechaAprobacion,
        estudiante: estudiantePago.estudiante,
        kit: estudiantePago.kit,
      };
      // asigno id del usuario loggeado
      aprobacion.administrador = new empleado(
        this._authService.usuario.empleado?.id_empleado
      );
      if (this.id) {
        aprobacion.id_aprobacion = this.id;
        this.actualizarAprobacion(aprobacion);
      } else {
        this.crearAprobacion(aprobacion);
      }
    } else {
      this.entregarKitForm.markAllAsTouched();
    }
  };

  crearAprobacion = (aprobacion: Aprobacion) => {
    this._aprobacionService.crearAprobacion(aprobacion).subscribe({
      next: (response) => {
        if (response === 'ok') {
          this._mensajesSweetService.mensajeOk('Aprobación registrada');
          this.entregarKitForm.reset();
          this.entregarKitForm.get('estadoAproba')?.setValue(false);
          this._router.navigate(['/inventariosModule/entregar/listar']);
        } else {
          this._mensajesSweetService.mensajeError(
            'Upss!',
            'No se pudo registrar la aprobación'
          );
        }
      },
    });
  };

  actualizarAprobacion = (aprobacion: Aprobacion) => {
    this._aprobacionService.actualizarAprobacion(aprobacion).subscribe({
      next: (response) => {
        if (response === 'ok') {
          this.entregarKitForm.reset();
          this._mensajesSweetService.mensajeOk('Aprobación Actualizada');
          this._router.navigate(['/inventariosModule/entregar/listar']);
        } else {
          this._mensajesSweetService.mensajeError(
            'Upss!',
            'No se pudo actualizar la aprobación'
          );
        }
      },
    });
  };
  getAprobacion = (id: number) => {
    this._aprobacionService.getAprobacionPorId(id).subscribe({
      next: (response: ResAprobacion) => {
        if (response.status === 'ok') {
          
          //.getEstudPago(response.aprobacion.estudiante.id_estudiante);
          this.entregarKitForm.patchValue(response.aprobacion);
        }
      },
      error: (error) => {
        if (error.status === 404) {
          this._mensajesSweetService.mensajeError(
            'Upss!',
            'No se pudo encontrar esa aprobación'
          );
          this._router.navigate(['/inventariosModule/entregar/listar']);
        }
      },
    });
  };

  getEstudPago = (id: number) => {
    this._aprobacionService.getEstudPago(id).subscribe({
      next: (response: ResAprobacion) => {
        if (response.status === 'ok') {
          console.log('---->',response.aprobacion);
          this.estudPago = response.aprobacion;
        }
      },
      
      error: (error) => {
        if (error.status === 404) {
          this._mensajesSweetService.mensajeError(
            'Upss!',
            'No se pudo encontrar esa aprobación'
          );
          this._router.navigate(['/inventariosModule/entregar/listar']);
        }
      },
    });
    
  };

  getValorCheck = () => this.entregarKitForm.controls?.['estadoAproba'].value;

  verificarCampo = (campo: string): boolean => {
    return (
      (this.entregarKitForm.controls?.[campo].invalid || false) &&
      (this.entregarKitForm.controls?.[campo].touched || false)
    );
  };

  get identificacionErrorMsg(): string {
    const errors = this.entregarKitForm.get('estudiantePago')?.errors;
    if (errors?.['required']) {
      return 'Estudiante es requerido';
    }
    return '';
  }
}
