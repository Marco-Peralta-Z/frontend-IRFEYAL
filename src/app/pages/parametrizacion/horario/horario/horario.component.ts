import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Horas_Intensivo, Horas_NoIntensivo } from 'src/app/material/horas';
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
    this.listParalelo = new Array
    for (let index = 0; index < this.selectperiodo.listaHorario.length; index++) {
      if (this.selectperiodo.listaHorario[index].id_tutor.id_curso.id_curso == this.seleccursos.id_curso) {
        this.listParalelo.push(this.selectperiodo.listaHorario[index].id_tutor);
      }
    }

    for (var ib = 0; ib <= this.listParalelo.length; ib++) {
      for (var j = 0; j < this.listParalelo.length - 1; j++) {
        if (ib != j) {
          if (this.listParalelo[ib].id_paralelo.id_paralelo == this.listParalelo[j].id_paralelo.id_paralelo) {
            this.listParalelo.splice(ib, 1);
          }
        }
      }
    }

  }
  listOrHor: any[] = [];

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

  listar() {
    let horas: any[];
    if (this.selectperiodo.malla.id_modalidad.descripcion.toLowerCase() == "intensivo") {
      horas = Horas_Intensivo.horas;

    } else {
      horas = Horas_NoIntensivo.horas;
    }
    let listado: any[] = [];
    
    for (let index = 0; index < horas.length; index++) {
      
      listado.push({
        id: horas[index].id,
        hora_inicio: horas[index].inicio,
        hora_fin: horas[index].fin,

      })
    }
    this.listOrHor.push(listado);
    console.log(this.listOrHor)
  }



}
