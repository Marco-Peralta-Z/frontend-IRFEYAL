import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/Model/Parametrizacion/Curso';
import { MallaService } from 'src/app/Servicio/parametrizacion/Service Malla/malla.service';

@Component({
  selector: 'app-malla-curso',
  templateUrl: './malla-curso.component.html',
  styleUrls: ['./malla-curso.component.css']
})
export class MallaCursoComponent implements OnInit {

  constructor(private sevicemalla: MallaService) { }
  liscursos: Curso[] = [];
  ngOnInit(): void {
    let id = localStorage.getItem("id_malla")?.toString();
    this.sevicemalla.getidMalla(id).subscribe(data => {
      this.liscursos = data.listaCursos;
    });
  }
}
