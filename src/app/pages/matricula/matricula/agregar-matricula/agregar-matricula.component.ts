import { Component, OnInit } from '@angular/core';
import { provincia } from '../../../../Model/rolesTS/provincia';
import { Estudiante } from '../../../../Model/Matriculas/estudiante';
import { EstudianteService } from '../../../../Servicio/moduloMatricula/estudianteServices/estudiante.service';
import { Matricula } from '../../../../Model/Matriculas/matricula';
import { Curso } from '../../../../Model/Parametrizacion/Curso';
import { MatriculaService } from '../../../../Servicio/moduloMatricula/matriculaServices/matricula.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-agregar-matricula',
  templateUrl: './agregar-matricula.component.html',
  styleUrls: ['./agregar-matricula.component.scss'],
  providers: [MessageService]
})
export class AgregarMatriculaComponent implements OnInit {
  selectedProvincia:  provincia[]=[];
  estudiante:Estudiante = new Estudiante() ;
  matricula: Matricula = new Matricula();
  filteredProvincia: provincia[]=[];
  cursos: Curso[]=[];
  errores: string[]=[];
  provincias: provincia[]=[];
  activeIndex1: number = 0;
  cedula: string ="";
  fullName:string ="";
  existe:boolean=true;
  checked: boolean = false;
  selectedRequerimientos: string[] = [];
  modalidad: string ="";
  display: boolean=false;
  nombre: string ="";
  mens:string="";
  campo:string="Cedula incompleta!";
  constructor(private estudianteService: EstudianteService,
    private matriculaService: MatriculaService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.estudianteService.getProvincias()
    .subscribe(provincia => this.provincias=provincia);


    this.matriculaService.getCursos()
    .subscribe(curso => this.cursos=curso);
  }

  
  filterCountry(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.provincias.length; i++) {
        let provincia = this.provincias[i];
        if (provincia.provincia.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(provincia);
        }
    }

    this.filteredProvincia = filtered;
    
}
mostrar(){
  console.log(this.modalidad);
}

buscar(){
  if (this.cedula !== "") {
    this.estudianteService.getEstudiantePorCedula(this.cedula.trim())
  .subscribe(estudiante => {
    this.estudiante = estudiante
    this.fullName= this.estudiante.id_persona.nombre+ " "+ this.estudiante.id_persona.apellido 
    this.mens="Estudiante Encontrado"
    this.messageService.add({key: 'tc', severity:'success', summary: 'Busqueda', detail: 'Estudiante Encontrado'});

    // swal.fire('Busqueda Estudiante...', this.mens, 'success')
  },
  err =>{
    err.error.mensaje;
    this.display=true
    this.mens="Estudiante no Encontrado"
    this.messageService.add({key: 'tc', severity:'error', summary: 'Busqueda', detail: 'Estudiante no Encontrado'});
    // swal.fire('Busqueda Estudiante...', this.mens, 'error')
  });
  }else{
    this.campo="No se permite campos vacios"
  }
  
}
}
