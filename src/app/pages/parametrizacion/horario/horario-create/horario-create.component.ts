import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { dia, Horas_Intensivo, Horas_NoIntensivo } from 'src/app/material/horas';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { Curso } from 'src/app/Model/Parametrizacion/Curso';
import { Horario } from 'src/app/Model/Parametrizacion/Horario';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { tutor } from 'src/app/Model/Parametrizacion/tutor';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { CursosService } from 'src/app/Servicio/parametrizacion/Service Curso/cursos.service';
import { PeriodoService } from 'src/app/Servicio/parametrizacion/Service Periodo/periodo.service';
import { ServiceHorarioService } from 'src/app/Servicio/parametrizacion/Servicio horario/service-horario.service';

@Component({
  selector: 'app-horario-create',
  templateUrl: './horario-create.component.html',
  styleUrls: ['./horario-create.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class HorarioCreateComponent implements OnInit {

  constructor(
    private servicePeriodo: PeriodoService,
    private router: Router,
    public dialogService: DialogService,
    public messageService: MessageService,
    private serviceCurso: CursosService,
    private servicehorario: ServiceHorarioService
  ) { }

  listperiodo: Periodo[] = [];
  selectperiodo: Periodo = new Periodo;
  horas: any[] = [];
  selehoras: any = null;
  selectasignatura!: Asignatura;
  selecDocente: empleado = new empleado;
  selectCurso!: Curso;
  listCurso: Curso[] = []
  listParalelo: tutor[] = [];
  selectParalelo!: tutor;
  listhorario: Horario[] = [];
  listAsig: Asignatura[] = [];
  listdia: any[] = [];
  selectdia: any;
  vh: boolean = false;
  value: number = 0;
  hi: Horas_Intensivo = new Horas_Intensivo;
  hn: Horas_NoIntensivo = new Horas_NoIntensivo;
  horariosave: Horario = new Horario;

  ngOnInit(): void {
    this.llenarTablas();
  }

  llenarTablas() {
    this.servicePeriodo.getAllPerdiodo().subscribe(data => {
      this.listperiodo = data;
    })


    this.servicehorario.getAllHorario().subscribe(data => {
      this.listhorario = data;
    })
  }


  listhoras() {
    try {
      this.horas = new Array;
      this.selehoras = null;
      this.selectasignatura = new Asignatura;
      this.selecDocente = new empleado;
      this.selectCurso = new Curso;
      this.selectParalelo = new tutor;
      this.listCurso = this.selectperiodo.malla.listaCursos;
      this.listAsig = this.selectperiodo.malla.listaAsignaturas;
      this.listdia=new Array;
      if (this.selectperiodo.malla.id_modalidad.descripcion.toLocaleLowerCase() == "intensivo") {
        this.listdia = dia.dia;
      } else {
        this.listdia = dia.dia2;
      }
    } catch (error) {

    }
  }

  llenarHoras() {
    this.horas = new Array;
    this.hi = new Horas_Intensivo;
    this.hn = new Horas_NoIntensivo;
    if (this.selectperiodo.malla.id_modalidad.descripcion.toLowerCase() == "intensivo") {
      this.horas = this.hi.horas;
    } else {
      this.horas = this.hn.horas;
    }

  }

  verHoras() {
    try {
      this.horas = new Array;
      this.llenarHoras();
      for (let indexperiodo = 0; indexperiodo < this.selectperiodo.listaHorario.length; indexperiodo++) {
        for (let index = 0; index < this.listhorario.length; index++) {
          for (let index2 = 0; index2 < this.horas.length; index2++) {
            if (
              this.horas[index2].inicio == this.listhorario[index].tiempo_inicio &&
              this.selectperiodo.listaHorario[indexperiodo].id_horario == this.listhorario[index].id_horario &&
              this.selectperiodo.listaHorario[indexperiodo].id_tutor.id_tutor == this.selectParalelo.id_tutor &&
              this.selectperiodo.listaHorario[indexperiodo].id_tutor.id_curso.id_curso == this.selectCurso.id_curso &&
              this.selectperiodo.listaHorario[indexperiodo].dia == this.selectdia.id &&
              this.selectperiodo.listaHorario[indexperiodo].id_tutor.id_paralelo.id_paralelo == this.selectParalelo.id_paralelo.id_paralelo) {

              this.horas.splice(index2, 1);
            }
          }
        }
      }
    } catch (error) {

    }
  }

  verihora() {
    try {
      if (this.selehoras.code != "" && this.selehoras.code == "rc") {
        this.selehoras = null;
        this.vh = false;
        this.messageService.add({ severity: 'error', summary: 'Error de hora', detail: 'Esta hora no se puede seleccionar' });
      } else {
        this.vh = true;
      }
    } catch (error) {

    }
  }

  cerrarC() {
    try {
      this.selehoras = null;
      this.selecDocente = new empleado;
      this.selectasignatura = new Asignatura;
      this.selectParalelo = new tutor;
      this.selectCurso = new Curso;
    } catch (error) {

    }
  }

  guardar() {
    this.horariosave.id_tutor = this.selectParalelo;
    this.horariosave.id_asignatura = this.selectasignatura;
    this.horariosave.id_empleado = this.selecDocente;
    this.horariosave.dia = this.selectdia.id;
    this.horariosave.tiempo_inicio = this.selehoras.inicio;
    this.horariosave.tiempo_fin = this.selehoras.fin;
    this.servicehorario.postHorario(this.horariosave).subscribe(data1 => {
      if (data1) {
        this.servicehorario.getIdHorario(data1.horario.id_horario).subscribe(h => {
          this.selectperiodo.listaHorario.push(h);
          this.servicePeriodo.putPeriodo(this.selectperiodo).subscribe(data => {
            if (data) {
              this.selectperiodo = new Periodo;
              this.cancelar();
            }
          })
        })

      }
    })
  }

  cancelar() {
    this.router.navigate(['parametrizacion/horario']);
  }

  llenarParalelo() {
    this.serviceCurso.getAllTutor().subscribe(data => {
      //this.listParalelo = data;
      this.selectParalelo = new tutor;
      this.listParalelo = new Array;
      this.selectdia = new Array;
      this.selectParalelo = new tutor;
      this.horas = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].id_curso.id_curso == this.selectCurso.id_curso) {
          this.listParalelo.push(data[i]);
        }

      }

    })
  }
}
