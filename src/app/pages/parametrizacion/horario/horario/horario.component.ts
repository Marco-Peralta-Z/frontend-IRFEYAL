import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dia, horarioCompleto, Horas_Intensivo, Horas_NoIntensivo } from 'src/app/material/horas';
import { Curso } from 'src/app/Model/Parametrizacion/Curso';
import { Horario } from 'src/app/Model/Parametrizacion/Horario';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { tutor } from 'src/app/Model/Parametrizacion/tutor';
import { PeriodoService } from 'src/app/Servicio/parametrizacion/Service Periodo/periodo.service';
import { Path } from 'src/app/config';

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
  selectperiodo!: Periodo;
  listhorario: Horario[] = [];
  listcursos: Curso[] = [];
  seleccursos!: Curso;
  listParalelo: tutor[] = [];
  selectParalelo!: tutor;
  hi: Horas_Intensivo = new Horas_Intensivo;
  hn: Horas_NoIntensivo = new Horas_NoIntensivo;
  listOrHor: horarioCompleto[] = [];
  selechor: horarioCompleto = new horarioCompleto;
  public repeatHeaders = true;
  b1: boolean = false;
  b2: boolean = false;
  b3: boolean = false;
  path = Path.url;
  print: any;
  listdia:any[]=[];
  va1!:Boolean;
  va2!:Boolean;

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
    try {
      this.listcursos = new Array;
      this.seleccursos = new Curso;
      this.selectParalelo = new tutor;
      this.listParalelo = new Array;
      this.b1 = true;
      this.b2 = false;
      this.listcursos = this.selectperiodo.malla.listaCursos;
      if (this.selectperiodo.malla.id_modalidad.descripcion.toLocaleLowerCase() == "intensivo") {
        this.listdia = dia.dia;
        this.va1=true;
        this.va2=true;
      } else {
        this.listdia = dia.dia2;
        this.va1=true;
        this.va2=false;
      }
    } catch (error) {

    }
  }

  closePeriodo() {
    try {
      this.listcursos = new Array;
      this.seleccursos = new Curso;
      this.selectParalelo = new tutor;
      this.listParalelo = new Array;
      this.b1 = false;
      this.b2 = false;
      this.b3 = false;
      this.selectperiodo = new Periodo;
      this.listOrHor = new Array;
    } catch (error) {

    }
  }

  selecCurso() {
    try {
      this.selectParalelo = new tutor;
      this.listParalelo = new Array;
      for (let index = 0; index < this.selectperiodo.listaHorario.length; index++) {
        if (this.selectperiodo.listaHorario[index].id_tutor.id_curso.id_curso == this.seleccursos.id_curso) {
          this.listParalelo.push(this.selectperiodo.listaHorario[index].id_tutor);

        }
      }

      var hash: any[] = [];
      this.listParalelo = this.listParalelo.filter(function (current) {
        var exists = !hash[current.id_tutor];
        hash[current.id_tutor] = true;
        return exists;
      });
      this.b2 = true;
    } catch (error) {

    }
  }

  closeCurso() {
    this.b3 = false;
    this.b2 = false;
    this.selectParalelo = new tutor;
    this.listParalelo = new Array;
    this.listOrHor = new Array;
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

  listar() {
    this.listOrHor = new Array;
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
      if (horas[index].code == "rc") {
        this.selechor.materia1 = 'RECESO';
        this.selechor.materia2 = 'RECESO';
      } else {
        this.selechor.materia1 = "";
        this.selechor.materia2 = "";
      }
      this.listOrHor.push(this.selechor);
    }

    for (let j = 0; j < this.listhorario.length; j++) {
      for (let i = 0; i < this.listOrHor.length; i++) {
        if (this.listhorario[j].tiempo_inicio == this.listOrHor[i].hora_inicio && this.listhorario[j].dia == 1) {
          this.listOrHor[i].materia1 = this.listhorario[j].id_asignatura.descripcion + "<br /> Tutor: " + this.listhorario[j].id_empleado.persona.apellido + this.listhorario[j].id_empleado.persona.nombre;
        }
        if (this.listhorario[j].tiempo_inicio == this.listOrHor[i].hora_inicio && this.listhorario[j].dia == 2) {
          this.listOrHor[i].materia2 = this.listhorario[j].id_asignatura.descripcion + "<br /> Tutor: " + this.listhorario[j].id_empleado.persona.apellido + this.listhorario[j].id_empleado.persona.nombre;
        }
      }
    }
    this.b3 = true;
    this.imprimir();
  }

  closePalelo() {
    this.b3 = false;
  }

  imprimir() {
    this.print = "HORARIO DE CLASES DE_" +
      this.seleccursos.descripcion + "_PARALELO_" +
      this.selectParalelo.id_paralelo.descripcion +
      "_CICLO ESCOLAR_" + this.selectperiodo.ano_inicio + "_" + this.selectperiodo.ano_fin + ".pdf";
  }
}
