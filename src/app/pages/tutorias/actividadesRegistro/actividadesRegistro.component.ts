import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/Model/tutorias/registro';
import { MessageService } from 'primeng/api';
import { ServiceTutoriasService } from 'src/app/Servicio/tutorias/registro/servicio-tutorias.service';
import { AuthService } from 'src/app/Servicio/auth/auth.service';
import { usuario } from 'src/app/Model/rolesTS/usuario';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';
import { Modalidad } from 'src/app/Model/Parametrizacion/Modalidad';
import { Curso } from 'src/app/Model/Parametrizacion/Curso';
import { Paralelo } from 'src/app/Model/Parametrizacion/Paralelo';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';

@Component({
  selector: 'app-actividadesRegistro',
  templateUrl: './actividadesRegistro.component.html',
  styleUrls: ['./actividadesRegistro.component.scss'],
  providers: [MessageService]
})
export class ActividadesRegistroComponent implements OnInit {

  constructor(private servitutorias: ServiceTutoriasService, private messageService: MessageService, private auth: AuthService) { }

  submitted!: boolean;
  Dialog!: boolean;
  periodo!: Periodo[];
  selectPeriodo!: Periodo;
  malla!: Malla[];
  selectMalla!: Malla;
  modalidad!: Modalidad[];
  selectModalidad!: Modalidad;
  curso!: Curso[];
  selectCurso!: Curso;
  paralelo!: Paralelo[];
  selectParalelo!: Paralelo;
  asignatura!: Asignatura[];
  selectAsignatura!: Asignatura;
  registro!: Registro[];
  selectRegistro!: Registro;
  listarBoolean: boolean = true;
  nuevaconsultaBoolean: boolean = true;
  filtrosBoolean: boolean = false;
  idempleados: any;
  porcentajeAportes: number = 0.4;
  porcentajeExamenesQuimestre: number = 0.2;

  ngOnInit(): void {
    this.idempleados = this.usuarioGuardado().empleado?.id_empleado;
    console.log(this.idempleados)
    this.llenarperiodos();
  }

  usuarioGuardado = (): usuario => this.auth.usuario;

  llenarperiodos() {
    this.servitutorias.getPeriodos(this.idempleados).subscribe(dataPeriodos => {
      this.periodo = dataPeriodos;
    });
  }

  llenarmallas() {
    this.selectMalla = new Malla;
    this.selectModalidad = new Modalidad;
    this.selectCurso = new Curso;
    this.selectParalelo = new Paralelo;
    this.selectAsignatura = new Asignatura;
    this.modalidad = [];
    this.curso = [];
    this.paralelo = [];
    this.asignatura = [];
    this.listarBoolean = true;
    this.servitutorias.getMallas(this.idempleados, this.selectPeriodo).subscribe(dataMallas => {
      this.malla = dataMallas;
    });
  }

  llenarmodalidades() {
    this.selectModalidad = new Modalidad;
    this.selectCurso = new Curso;
    this.selectParalelo = new Paralelo;
    this.selectAsignatura = new Asignatura;
    this.curso = [];
    this.paralelo = [];
    this.asignatura = [];
    this.listarBoolean = true;
    this.servitutorias.getModalidades(this.idempleados, this.selectPeriodo, this.selectMalla).subscribe(dataModalidades => {
      this.modalidad = dataModalidades;
    });
  }

  llenarcursos() {
    this.selectCurso = new Curso;
    this.selectParalelo = new Paralelo;
    this.selectAsignatura = new Asignatura;
    this.paralelo = [];
    this.asignatura = [];
    this.listarBoolean = true;
    this.servitutorias.getCursos(this.idempleados, this.selectPeriodo, this.selectMalla, this.selectModalidad).subscribe(dataCursos => {
      this.curso = dataCursos;
    });
  }

  llenarparalelos() {
    this.selectParalelo = new Paralelo;
    this.selectAsignatura = new Asignatura;
    this.asignatura = [];
    this.listarBoolean = true;
    this.servitutorias.getParalelos(this.idempleados, this.selectPeriodo, this.selectMalla, this.selectModalidad, this.selectCurso).subscribe(dataParalelos => {
      this.paralelo = dataParalelos;
    });
  }

  llenarasignaturas() {
    this.selectAsignatura = new Asignatura;
    this.listarBoolean = true;
    this.servitutorias.getAsignaturas(this.idempleados, this.selectPeriodo, this.selectMalla, this.selectModalidad, this.selectCurso, this.selectParalelo).subscribe(dataAsignatura => {
      this.asignatura = dataAsignatura;
    });
  }

  habilitarListar() {
    this.listarBoolean = false;
  }

  llenarregistros() {
    this.servitutorias.getRegistros(this.idempleados, this.selectPeriodo, this.selectMalla, this.selectModalidad, this.selectCurso, this.selectParalelo, this.selectAsignatura).subscribe(dataRegistro => {
      if (dataRegistro.length == 0) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'NO HAY REGISTROS', life: 3000 });
      } else {
        this.registro = dataRegistro;
        for (let i = 0; i < this.registro.length; i++) {
          this.validarAprobaciones(this.registro[i]);
          this.registro[i].id_matricula.estudiante.id_persona.apellido = this.registro[i].id_matricula.estudiante.id_persona.apellido.toUpperCase();
          this.registro[i].id_matricula.estudiante.id_persona.nombre = this.registro[i].id_matricula.estudiante.id_persona.nombre.toUpperCase();
        }
        this.registro.sort((o1, o2) => {
          if (o1.id_matricula.estudiante.id_persona.apellido < o2.id_matricula.estudiante.id_persona.apellido) {
            return -1;
          } else if (o1.id_matricula.estudiante.id_persona.apellido > o2.id_matricula.estudiante.id_persona.apellido) {
            return 1;
          } else {
            return 0;
          }
        })
        this.listarBoolean = true;
        this.filtrosBoolean = true;
        this.nuevaconsultaBoolean = false;
        console.log(this.registro);
      }
    });
  }

  validarAprobaciones(registro: Registro) {
    if (registro.aporte1 == null) registro.aporte1 = 0;
    if (registro.aporte2 == null) registro.aporte2 = 0;
    if (registro.examen_Iquimestre == null) registro.examen_Iquimestre = 0;
    if (registro.promedio_Iquimestre == null) registro.promedio_Iquimestre = 0;
    if (registro.aporte3 == null) registro.aporte3 = 0;
    if (registro.aporte4 == null) registro.aporte4 = 0;
    if (registro.examen_IIquimestre == null) registro.examen_IIquimestre = 0;
    if (registro.promedio_IIquimestre == null) registro.promedio_IIquimestre = 0;
    if (registro.conducta == null) registro.conducta = 0;
    if (registro.examen_supletorio == null) registro.examen_supletorio = 0;
    if (registro.examen_remedial == null) registro.examen_remedial = 0;
    if (registro.examen_gracia == null) registro.examen_gracia = 0;
    if (registro.nota_final == null) registro.nota_final = 0;
    registro.promedio_Iquimestre = parseFloat(((parseFloat(registro.aporte1.toString()) * this.porcentajeAportes) +
      (parseFloat(registro.aporte2.toString()) * this.porcentajeAportes) +
      (parseFloat(registro.examen_Iquimestre.toString()) * this.porcentajeExamenesQuimestre)).toFixed(2));
    registro.promedio_IIquimestre = parseFloat(((parseFloat(registro.aporte3.toString()) * this.porcentajeAportes) +
      (parseFloat(registro.aporte4.toString()) * this.porcentajeAportes) +
      (parseFloat(registro.examen_IIquimestre.toString()) * this.porcentajeExamenesQuimestre)).toFixed(2));
    registro.nota_final = Math.round(((parseFloat(registro.promedio_Iquimestre.toString()) + parseFloat(registro.promedio_IIquimestre.toString())) / 2));
    if (registro.promedio_Iquimestre >= 4) {
      if (registro.nota_final >= 7) {
        registro.estado = "APROBADO";
      } else {
        if (registro.examen_supletorio == 0) {
          registro.estado = "SUPLETORIO";
        } else {
          if (registro.examen_supletorio >= 7) {
            registro.estado = "APROBADO";
            registro.examen_supletorio = 7;
          } else {
            if (registro.examen_remedial == 0) {
              registro.estado = "REMEDIAL";
            } else {
              if (registro.examen_remedial >= 7) {
                registro.estado = "APROBADO";
                registro.examen_remedial = 7;
              } else {
                if (registro.examen_gracia == 0) {
                  registro.estado = "GRACIA";
                } else {
                  if (registro.examen_gracia >= 7) {
                    registro.estado = "APROBADO";
                    registro.examen_gracia = 7;
                  } else {
                    registro.estado = "REPROBADO";
                  }
                }
              }
            }
          }
        }
      }
    } else {
      if (registro.examen_remedial == 0) {
        registro.estado = "REMEDIAL";
      } else {
        if (registro.examen_remedial >= 7) {
          registro.estado = "APROBADO";
        } else {
          if (registro.examen_gracia == 0) {
            registro.estado = "GRACIA";
          } else {
            if (registro.examen_gracia >= 7) {
              registro.estado = "APROBADO";
            } else {
              registro.estado = "REPROBADO";
            }
          }
        }
      }
    }
  }

  limpiarFormulario() {
    this.filtrosBoolean = false;
    this.nuevaconsultaBoolean = true;
    this.listarBoolean = true;
    this.registro = [];
    this.selectAsignatura = new Asignatura;
  }

  edit(selectRegistro: Registro) {
    this.selectRegistro = { ...selectRegistro };
    this.Dialog = true;
  }

  save() {
    this.submitted = true;
    this.registro[this.findIndexById(this.selectRegistro.id_registro)] = this.selectRegistro;
    this.messageService.add({ severity: 'success', summary: 'Hecho', detail: 'Registro Actualizado', life: 3000 });
    this.validarAprobaciones(this.selectRegistro);
    this.selectRegistro.id_asignatura = this.selectAsignatura;
    console.log(this.selectRegistro);
    this.servitutorias.setRegistros(this.selectRegistro).subscribe();
    this.registro = [...this.registro];
    this.Dialog = false;
    this.selectRegistro = { ...this.selectRegistro };
  }

  hideDialog() {
    this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'No Se Realizo Cambios', life: 3000 });
    this.Dialog = false;
    this.submitted = false;
  }

  findIndexById(id: Number) {
    let index = -1;
    for (let i = 0; i < this.registro.length; i++) {
      if (this.registro[i].id_registro === id) {
        index = i;
        break;
      }
    }
    return index;
  }

}

