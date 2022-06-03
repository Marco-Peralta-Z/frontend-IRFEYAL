import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { CertificadoMatricula } from 'src/app/Model/Secretaria/certificadoMatricula';
import { MatriculaService } from 'src/app/Servicio/moduloMatricula/matriculaServices/matricula.service';
import { Matricula } from 'src/app/Model/Matriculas/matricula';

@Component({
  selector: 'app-generar-certificadomatricula',
  templateUrl: './generar-certificadomatricula.component.html',
  styleUrls: ['./generar-certificadomatricula.component.scss']
})
export class GenerarCertificadomatriculaComponent implements OnInit {
  certificadoMatricula: CertificadoMatricula[]=[];
  estudiantes: Estudiante[]=[];
  matriculas: Matricula[]=[];
  constructor(private router: Router, private matriculaService: MatriculaService) { }

  ngOnInit(): void {
    this.getMatriculas();
  }

  getMatriculas(){
    this.matriculaService.getMatricula()
    .subscribe(certificado=>{
      console.log(certificado);
      this.matriculas=certificado;
      
    })
  }

  regresarHome(){
    this.router.navigate(["home"]);
  }   

  imprimir(){
    
  }
  
  buscar(){
    
  } 

}
