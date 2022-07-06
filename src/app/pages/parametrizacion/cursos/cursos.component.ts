import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Curso } from 'src/app/Model/Parametrizacion/Curso';
import { Paralelo } from 'src/app/Model/Parametrizacion/Paralelo';
import { tutor } from 'src/app/Model/Parametrizacion/tutor';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { AsignaturaService } from 'src/app/Servicio/parametrizacion/Service Asignatura/asignatura.service';
import { CursosService } from 'src/app/Servicio/parametrizacion/Service Curso/cursos.service';
import { ParaleloeService } from 'src/app/Servicio/parametrizacion/Service Paralelo/paraleloe.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CursosComponent implements OnInit {

  constructor(
    private servicecursos: CursosService,
    private serviceasig: AsignaturaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  listcursos!: Curso[];
  panelCursosNuevo!: Boolean;
  star!: Boolean;
  empleados: any[] = [];
  selecempleadodoc!: empleado;
  selectcurso: Curso = new Curso;
  submitted: boolean = false;
  //listparalelo!: Paralelo[];
  //selectparalelo!: Paralelo;
  update!: Boolean;
  idGlobal!: any;
  descr: String = "";

  ngOnInit(): void {
    this.llenartable();
  }

  llenartable() {
    this.star = true;
    this.servicecursos.getAllCursos().subscribe(data => {
      this.listcursos = data;
      this.star = false;
      this.listcursos.sort();
    });

    this.serviceasig.getRolUsuario().subscribe(data => {
      this.empleados = new Array();
      console.log(data)
      for (let index = 0; index < data.length; index++) {
        if (data[index].rol.descripcion.toLocaleLowerCase() == "docente") {
          console.log(data[index])
          this.empleados.push(data[index].usuario.empleado);
        }
      }
      this.empleados.sort();
      console.log(this.empleados);
    })


    /*this.serviceparalelo.getAllParalelo().subscribe(data => {
      this.listparalelo = data;
      this.listparalelo.sort();
    })
*/
  }

  activePanelCurso() {
    this.selecempleadodoc = new empleado;
    this.selectcurso = new Curso
    //this.selectparalelo = new Paralelo;
    this.descr = "";
    this.panelCursosNuevo = true;
  }

  cancelar() {
    this.panelCursosNuevo = false;
    this.llenartable();
  }

  saveCurso() {

    if (!this.update) {
      if (this.selectcurso.descripcion == "") {
        this.submitted = true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Llene todos los campos' });
      } else {

        this.submitted = false;

        this.servicecursos.postCurso(this.selectcurso).subscribe(data => {
          if (data == null) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Se Pudo Guardar ' });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Guardado' });
          }
          this.cancelar();
        })

      }
    } else {
      this.selectcurso.id_curso = this.idGlobal;
      /*this.selectcurso.id_empleado = this.selecempleadodoc;
      this.selectcurso.id_paralelo = this.selectparalelo;*/
      //this.selectcurso.descripcion = this.descr;
      this.servicecursos.putCurso(this.selectcurso).subscribe(data => {
        if (data == null) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Se Pudo Guardar ' });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Guardado' });
        }
        console.log(data)
        this.cancelar();
      })
    }
  }

  deleteCurso(curso: Curso, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Estas Seguro Que Deseas Eliminar Esta Curso?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicecursos.deleteCurso(curso).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Eliminado' });
          this.cancelar();
        })

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No se elimino el curso' });
      }
    });
  }

  updateCurso(curso: Curso) {
    //this.selecempleadodoc = curso.id_empleado;
    //this.selectparalelo = curso.id_paralelo;
    this.descr = curso.descripcion;
    this.selectcurso = curso;
    this.panelCursosNuevo = true;
    this.idGlobal = curso.id_curso;
    this.update = true;
  }

  //Paralelo
  listtutor: tutor[] = [];
  buscarParalelo(c: Curso) {
    this.listtutor = new Array;
    this.servicecursos.getAllTutor().subscribe(data => {
      data.forEach(element => {
        if (Number(element.id_curso.id_curso) == Number(c.id_curso)) {
          this.listtutor.push(element);
        }
      });
    })
  }

  AsignarTutor(curso: Curso) {
    localStorage.setItem("id_curso", curso.id_curso.toString());
    this.router.navigate(['parametrizacion/curso/tutor']);
  }

  deleteTutor(t: tutor, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estas Seguro Que Deseas Eliminar?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicecursos.deleteTutor(t).subscribe(data => {
          if (data) {
            this.listcursos = new Array;
            for (let index = 0; index < this.listtutor.length; index++) {
              if (this.listtutor[index].id_tutor == t.id_tutor) {
                this.listtutor.splice(index, 1);
              }
            }
            this.llenartable();
            this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Eliminado con exito' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error al Eliminar ', detail: 'No se pudo eliminar con exito' });
          }
        })

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No se elimino' });
      }
    });

  }
}
