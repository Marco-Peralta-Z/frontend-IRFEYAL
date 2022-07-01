import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { Curso } from 'src/app/Model/Parametrizacion/Curso';
import { Paralelo } from 'src/app/Model/Parametrizacion/Paralelo';
import { tutor } from 'src/app/Model/Parametrizacion/tutor';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { AsignaturaService } from 'src/app/Servicio/parametrizacion/Service Asignatura/asignatura.service';
import { CursosService } from 'src/app/Servicio/parametrizacion/Service Curso/cursos.service';
import { ParaleloeService } from 'src/app/Servicio/parametrizacion/Service Paralelo/paraleloe.service';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss'],
  providers: [MessageService, ConfirmationService],
  styles: ['padding: .25rem .5rem;  border-radius: 3px;  display: inline-flex;  margin-right: .5rem;  background-color: var(--primary-color);color: var(--primary-color-text);']

})
export class TutorComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private servicecurso: CursosService,
    private serviceparalelo: ParaleloeService,
    private serviceasign: AsignaturaService,
    private ruoter: Router
  ) { }

  tipo = "";
  tutor: tutor = new tutor;
  curso: Curso = new Curso;
  listParalelos: Paralelo[] = [];
  listempleado: empleado[] = [];

  selectparalelo: Paralelo = new Paralelo;
  selectdocente: empleado = new empleado;


  ngOnInit(): void {
    this.tipo = "Nuevo"
    this.llenartabla();
  }

  llenartabla() {
    let id_curso = localStorage.getItem("id_curso")
    this.serviceasign.getEmpleados().subscribe(data => {
      this.listempleado = data;
      for (let index = 0; index < data.length; index++) {
        if (data[index].cargo == "contratacion_docente") {
          this.listempleado.push(data[index]);
        }
      }
    })

    this.servicecurso.getIdCursos(id_curso).subscribe(data => {
      this.curso = data;
    })

    this.serviceparalelo.getAllParalelo().subscribe(data => {
      this.listParalelos = data;
      this.servicecurso.getAllTutor().subscribe(data2 => {
        for (let index = 0; index < data2.length; index++) {
          if (data2[index].id_curso.id_curso == Number(id_curso)) {
            for (let index2 = 0; index2 < data.length; index2++) {
              if (data[index2].id_paralelo == data2[index].id_paralelo.id_paralelo) {
                data.splice(index2, 1);
                this.listParalelos = new Array;
                this.listParalelos = data;
                break
              }
            }
          }
        }
      })
    })
  }

  saveTutor() {
    if (this.selectparalelo == null || this.selectdocente == null) {
      this.messageService.add({ severity: 'error', summary: 'Error al Guardar', detail: 'Recuerde llenar todos los campos' });
    } else {
      this.tutor.id_curso = this.curso;
      this.tutor.id_empleado = this.selectdocente;
      this.tutor.id_paralelo = this.selectparalelo;
      this.servicecurso.postTutor(this.tutor).subscribe(data => {
        if (data) {
          this.messageService.add({ severity: 'success', summary: 'Guardado con Exito', detail: 'Todos los datos fueron almacenado con total exito' });
          this.cancelar();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error al Guardar', detail: 'No se pudo guardar con exito' });

        }
      })
    }
  }

  cancelar() {
    this.ruoter.navigate(['parametrizacion/curso'])
  }
}
