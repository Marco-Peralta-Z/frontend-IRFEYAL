import { Component, OnInit } from '@angular/core';
import { provincia } from '../../../../Model/rolesTS/provincia';
import { Estudiante } from '../../../../Model/Matriculas/estudiante';
import { EstudianteService } from '../../../../Servicio/moduloMatricula/estudianteServices/estudiante.service';
import { Matricula } from '../../../../Model/Matriculas/matricula';
import { Curso } from '../../../../Model/Parametrizacion/Curso';
import { MatriculaService } from '../../../../Servicio/moduloMatricula/matriculaServices/matricula.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Modalidad } from '../../../../Model/Parametrizacion/Modalidad';
import { Periodo } from '../../../../Model/Parametrizacion/Periodo';
import { Paralelo } from '../../../../Model/Parametrizacion/Paralelo';
import { usuario } from '../../../../Model/rolesTS/usuario';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-agregar-matricula',
  templateUrl: './agregar-matricula.component.html',
  styleUrls: ['./agregar-matricula.component.scss'],
  providers: [MessageService]
})
export class AgregarMatriculaComponent implements OnInit {
  selectedProvincia: provincia[] = [];
  estudiante: Estudiante = new Estudiante();
  matricula: Matricula = new Matricula();
  user: usuario = new usuario();
  filteredProvincia: provincia[] = [];
  cursos: Curso[] = [];
  jornadas: Modalidad[]=[];
  periodos: Periodo[]=[];
  paralelos: Paralelo[]=[];
  errores: string[] = [];
  provincias: provincia[] = [];
  fecha: Date= new Date();
  activeIndex1: number = 0;
  cedula: string = "";
  fullName: string = "";
  existe: boolean = true;
  checked: boolean = false;
  selectedRequerimientos: string[] = [];
  modalidad: string = "";
  display: boolean = false;
  nombre: string = "";
  mens: string = "";
  campo: string = "Cedula incompleta!";

  matriculaFormulario: FormGroup = this.fb.group({
    cedula: [],
    nameComplete: [, [Validators.required]],
    nacimiento: [, [Validators.required]],
    genero: [, [Validators.required]],
    Rcedula: [, [Validators.required]],
    RnameComplete: [, [Validators.required]],
    Rjornada: [, [Validators.required]],
    Rcurso: [, [Validators.required]],
    Rfecha: [, [Validators.required]],
    Rmodalidad: [, [Validators.required]],
    Rlectivo: [, [Validators.required]],
    callePrincipal: [, [Validators.required]],
    calleSecundaria: [, [Validators.required]],
    provincia: [, [Validators.required]],
    canton: [, [Validators.required]],
    parroquia: [, [Validators.required]],
    telefono: [, [Validators.required]],
    celular: [, [Validators.required]],
    email: [, [Validators.required]],
    inscripcion: [,[Validators.required]],
    copCedula:[,[Validators.required]],
    copVotacion:[,[Validators.required]],
    certMatricula:[, [Validators.required]],
    city:[,],
    periodo:['',[Validators.required]],
    curso:['',[Validators.required]],
    paralelo:['',[Validators.required]],
    jornada:['',[Validators.required]]
  });


  constructor(private estudianteService: EstudianteService,
    private matriculaService: MatriculaService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.estudianteService.getProvincias()
      .subscribe(provincia => this.provincias = provincia);

   this.cargarCombox();
  }


  filterCountry(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.provincias.length; i++) {
      let provincia = this.provincias[i];
      if (provincia.provincia.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(provincia);
      }
    }

    this.filteredProvincia = filtered;

  }
  mostrar() {
    console.log(this.modalidad);
  }

  buscar() {
    if (this.cedula !== "") {
      this.estudianteService.getEstudiantePorCedula(this.cedula.trim())
        .subscribe(estudiante => {
          this.estudiante = estudiante
          this.matricula.estudiante=estudiante;
          this.matricula.fechaMatricula= new Date();
          this.fullName = this.estudiante.id_persona.nombre + " " + this.estudiante.id_persona.apellido
          this.mens = "Estudiante Encontrado"
          this.messageService.add({ key: 'tc', severity: 'success', summary: 'Busqueda', detail: 'Estudiante Encontrado' });

          // swal.fire('Busqueda Estudiante...', this.mens, 'success')
        },
          err => {
            err.error.mensaje;
            this.display = true
            this.mens = "Estudiante no Encontrado"
            this.messageService.add({ key: 'tc', severity: 'error', summary: 'Busqueda', detail: 'Estudiante no Encontrado' });
            // swal.fire('Busqueda Estudiante...', this.mens, 'error')
          });
    } else {
      this.campo = "No se permite campos vacios"
    }

  }


  guardarMatricula(){

    // if (this.matriculaFormulario.invalid) {
    //   this.matriculaFormulario.markAllAsTouched();
    //   this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'El formulario contiene errores' });
    //   return;
    // }
    this.user.id_usuario=2;
    this.matricula.usuario=this.user;
    this.matriculaService.postMatricula(this.matricula)
    .subscribe(newMatricula =>{
      this.messageService.add({key: 'tc', severity:'success', summary: 'Nueva Matricula', detail: `Nuevo id: ${newMatricula.id_matricula} creado con exito!`});
      this.activeIndex1=0;
      this.selectedRequerimientos=[];
      this.cedula="";
  
      // setTimeout(()=>{
      //   this.matriculaFormulario.reset();
      // },2500)
    });
  }

  cargarCombox(){
    this.matriculaService.getCursos()
    .subscribe(curso => this.cursos = curso);

  this.matriculaService.getPeriodos()
  .subscribe(periodo => this.periodos=periodo);

  this.matriculaService.getParalelos()
  .subscribe(paralelo => this.paralelos=paralelo);
  }
  buscarJornadaPorCurso(){
    this.matriculaService.getJormadasPorCurso(this.matricula.curso.id_curso)
    .subscribe(jornadas => this.jornadas=jornadas);
  }
}
