import { Component, OnInit } from '@angular/core';
import { Periodo, Modalidad, Curso, Paralelo, Asignatura, Registro } from 'src/app/Model/tutorias/registro';
import { MessageService, SharedModule, ConfirmationService } from 'primeng/api';
import { ServiceTutoriasService } from 'src/app/Servicio/tutorias/registro/servicio-tutorias.service';
import { AuthService } from 'src/app/Servicio/auth/auth.service';
import { usuario } from 'src/app/Model/rolesTS/usuario';

@Component({
  selector: 'app-actividadesRegistro',
  templateUrl: './actividadesRegistro.component.html',
  styleUrls: ['./actividadesRegistro.component.scss'],
  providers: [MessageService, SharedModule, ConfirmationService]
})
export class ActividadesRegistroComponent implements OnInit {

  constructor(private servitutorias:ServiceTutoriasService, private messageService: MessageService, private auth:AuthService) { }
  submitted!: boolean;

  statuses!: any[];

  Dialog!: boolean;

  periodo!: Periodo[];
  selectPeriodo!: Periodo;

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
  limpiarBoolean: boolean = true;
  filtrosBoolean: boolean = false;

  idempleados:any;

  ngOnInit(): void {
    this.idempleados=this.usuarioGuardado().empleado?.id_empleado;
    console.log(this.idempleados)
    this.llenarperiodos();
  }

  usuarioGuardado = (): usuario => this.auth.usuario;

  habilitarListar() {
    this.listarBoolean = false;
  }

  llenarperiodos() {
    this.servitutorias.getPeriodos(this.idempleados).subscribe(dataPeriodos => {
      this.periodo = dataPeriodos;
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
    this.servitutorias.getModalidades(this.idempleados,this.selectPeriodo).subscribe(dataModalidades => {
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
    this.servitutorias.getCursos(this.idempleados, this.selectModalidad, this.selectPeriodo).subscribe(dataCursos => {
      this.curso = dataCursos;
    });
  }

  llenarparalelos() {
    this.selectParalelo = new Paralelo;
    this.selectAsignatura = new Asignatura;
    this.asignatura = [];
    this.listarBoolean = true;
    this.servitutorias.getParalelos(this.idempleados, this.selectCurso, this.selectModalidad, this.selectPeriodo).subscribe(dataParalelos => {
      this.paralelo = dataParalelos;
    });
  }

  llenarasignaturas() {
    this.selectAsignatura = new Asignatura;
    this.listarBoolean = true;
    this.servitutorias.getAsignaturas(this.idempleados, this.selectParalelo, this.selectCurso, this.selectModalidad, this.selectPeriodo).subscribe(dataAsignatura => {
      this.asignatura = dataAsignatura;
    });
  }

  llenarregistros() {
    this.servitutorias.getRegistros(this.selectParalelo, this.selectCurso, this.selectModalidad, this.selectPeriodo,this.selectAsignatura).subscribe(dataRegistro => {
      if (dataRegistro.length == 0) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'NO HAY REGISTROS', life: 3000 });
      } else {
        this.registro = dataRegistro;
        this.listarBoolean = true;
        this.filtrosBoolean = true;
        this.limpiarBoolean = false;
      }
    });
  }

  limpiarFormulario() {
    this.filtrosBoolean = false;
    this.limpiarBoolean = true;
    this.selectPeriodo = new Periodo;
    this.selectModalidad = new Modalidad;
    this.selectCurso = new Curso;
    this.selectParalelo = new Paralelo;
    this.selectAsignatura = new Asignatura;
    this.listarBoolean = true;
    this.modalidad = [];
    this.curso = [];
    this.paralelo = [];
    this.asignatura = [];
    this.registro = [];
  }

  edit(selectRegistro: Registro) {
    this.selectRegistro = { ...selectRegistro };
    this.Dialog = true;
  }

  save() {
    this.submitted = true;
    if (this.selectRegistro.id_registro) {
      this.registro[this.findIndexById(this.selectRegistro.id_registro)] = this.selectRegistro;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Registro Actualizado', life: 3000 });
      this.servitutorias.setRegistros(this.selectRegistro).subscribe();
    }
    else {
      this.selectRegistro.id_registro = this.createId();
      this.registro.push(this.selectRegistro);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Registro Creado', life: 3000 });
    }
    this.registro = [...this.registro];
    this.Dialog = false;
    this.selectRegistro = { ...this.selectRegistro };
  }

  hideDialog() {
    this.messageService.add({ severity: 'error', summary: '', detail: 'No Se Realizo Cambios', life: 3000 });
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

  createId(): Number {
    let id = 0;
    for (var i = 0; i < 5; i++) {
      id += (Math.floor(Math.random()));
    }
    return id;
  }
}

