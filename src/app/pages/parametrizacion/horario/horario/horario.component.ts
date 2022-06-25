import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { horarioCompleto, Horas_Intensivo, Horas_NoIntensivo } from 'src/app/material/horas';
import { Curso } from 'src/app/Model/Parametrizacion/Curso';
import { Horario } from 'src/app/Model/Parametrizacion/Horario';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { tutor } from 'src/app/Model/Parametrizacion/tutor';
import { PeriodoService } from 'src/app/Servicio/parametrizacion/Service Periodo/periodo.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit {

  constructor(
    private servicePeriodo: PeriodoService,
    private router: Router
  ) { }

  listperiodo: Periodo[] = [];
  selectperiodo: Periodo = new Periodo;
  listhorario: Horario[] = [];
  listcursos: Curso[] = [];
  seleccursos!: Curso;

  ngOnInit(): void {
    this.llenarTablas();
  }

  llenarTablas() {
    this.servicePeriodo.getAllPerdiodo().subscribe(data => {
      this.listperiodo = data;

    })
  }

  nuevoHorario() {
    this.router.navigate(['parametrizacion/horario/create']);
  }


  selecPeriodo() {
    this.listcursos = new Array;
    this.seleccursos = new Curso;
    this.listcursos = this.selectperiodo.malla.listaCursos;
  }

  listParalelo: tutor[] = [];
  selectParalelo!: tutor;
  selecCurso() {
    this.listParalelo = new Array();
    for (let index = 0; index < this.selectperiodo.listaHorario.length; index++) {
      if (this.selectperiodo.listaHorario[index].id_tutor.id_curso.id_curso == this.seleccursos.id_curso) {
        this.listParalelo.push(this.selectperiodo.listaHorario[index].id_tutor);

      }
    }

    var hash:any[]=[];
    this.listParalelo = this.listParalelo.filter(function(current) {
      var exists = !hash[current.id_tutor];
      hash[current.id_tutor] = true;
      return exists;
    });
  }

  Paraleloselect() {
    this.listhorario = new Array;
    for (let index = 0; index < this.selectperiodo.listaHorario.length; index++) {
      if (this.selectperiodo.listaHorario[index].id_tutor.id_curso.id_curso == this.seleccursos.id_curso &&
        this.selectperiodo.listaHorario[index].id_tutor.id_paralelo.id_paralelo == this.selectParalelo.id_paralelo.id_paralelo) {
        this.listhorario.push(this.selectperiodo.listaHorario[index]);
      }
    }
    this.listar();
  }

  hi: Horas_Intensivo = new Horas_Intensivo;
  hn: Horas_NoIntensivo = new Horas_NoIntensivo;

  listOrHor: horarioCompleto[] = [];
  selechor: horarioCompleto = new horarioCompleto;
  listar() {
    this.listOrHor=new Array;
    let horas: any[];
    if (this.selectperiodo.malla.id_modalidad.descripcion.toLowerCase() == "intensivo") {
      horas = this.hi.horas;
    } else {
      horas = this.hn.horas;
    }

    for (let index = 0; index < horas.length; index++) {
      this.selechor = new horarioCompleto;
      this.selechor.id = horas[index].id;
      this.selechor.hora_inicio = horas[index].inicio;
      this.selechor.hora_fin = horas[index].fin;
      this.selechor.materia1 = "";
      this.selechor.materia2 = "";
      this.listOrHor.push(this.selechor);
    }

    for (let j = 0; j < this.listhorario.length; j++) {
      for (let i = 0; i < this.listOrHor.length; i++) {
        if (this.listhorario[j].tiempo_inicio == this.listOrHor[i].hora_inicio && this.listhorario[j].dia == 1) {
          this.listOrHor[i].materia1 = this.listhorario[j].id_asignatura.descripcion;
        }
        if (this.listhorario[j].tiempo_inicio == this.listOrHor[i].hora_inicio && this.listhorario[j].dia == 2) {
          this.listOrHor[i].materia2 = this.listhorario[j].id_asignatura.descripcion;
        }
      }
    }
  }
}
