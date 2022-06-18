import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/Model/Parametrizacion/Curso';
import { tutor } from 'src/app/Model/Parametrizacion/tutor';
import { CursosService } from 'src/app/Servicio/parametrizacion/Service Curso/cursos.service';
import { MallaService } from 'src/app/Servicio/parametrizacion/Service Malla/malla.service';

@Component({
  selector: 'app-malla-curso',
  templateUrl: './malla-curso.component.html',
  styleUrls: ['./malla-curso.component.css']
})
export class MallaCursoComponent implements OnInit {

  constructor(private sevicemalla: MallaService,private servicecursos:CursosService) { }
  liscursos: Curso[] = [];
  ngOnInit(): void {
    let id = localStorage.getItem("id_malla")?.toString();
    this.sevicemalla.getidMalla(id).subscribe(data => {
      this.liscursos = data.listaCursos;
    });
  }

  //Paralelo
  listtutor: tutor[] = [];
  buscarParalelo(c: Curso) {
    this.listtutor=new Array;
    this.servicecursos.getAllTutor().subscribe(data => {
      data.forEach(element => {
        if (Number(element.id_curso.id_curso) == Number(c.id_curso)) {
          this.listtutor.push(element);
        }
      });
    })
  }
}
