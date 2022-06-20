import { Component, OnInit } from '@angular/core';
import { provincia } from '../../../../Model/rolesTS/provincia';
import { Estudiante } from '../../../../Model/Matriculas/estudiante';
import { EstudianteService } from '../../../../Servicio/moduloMatricula/estudianteServices/estudiante.service';
import { Matricula } from '../../../../Model/Matriculas/matricula';
import { Curso } from '../../../../Model/Parametrizacion/Curso';
import { MatriculaService } from '../../../../Servicio/moduloMatricula/matriculaServices/matricula.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usuario } from 'src/app/Model/rolesTS/usuario';
import { Modalidad } from 'src/app/Model/Parametrizacion/Modalidad';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { Paralelo } from 'src/app/Model/Parametrizacion/Paralelo';
import { AuthService } from '../../../../Servicio/auth/auth.service';
import Swal from 'sweetalert2';
import { Malla } from '../../../../Model/Parametrizacion/Malla';
import { persona } from '../../../../Model/rolesTS/persona';




@Component({
  selector: 'app-agregar-matricula',
  templateUrl: './agregar-matricula.component.html',
  styleUrls: ['./agregar-matricula.component.scss'],
  providers: [MessageService]
})
export class AgregarMatriculaComponent implements OnInit {
  selectedProvincia: provincia[] = [];
  mallas: Malla[] = [];
  mallaSelectd: Malla = new Malla();
  cursoSelectd: Curso = new Curso();
  peridoSelectd: Periodo = new Periodo();
  paraleloSelectd: Paralelo = new Paralelo();
  modalidadSelectd: Modalidad = new Modalidad();
  estudiante: Estudiante = new Estudiante();
  personaSelectd: persona = new persona();
  personas: persona[] = [];
  matricula: Matricula = new Matricula();
  user: usuario = new usuario();
  filteredProvincia: provincia[] = [];
  cursos: Curso[] = [];
  modalidades: Modalidad[] = [];
  periodos: Periodo[] = [];
  paralelos: Paralelo[] = [];
  errores: string[] = [];
  fecha: Date = new Date();
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
  listRequerimientos: string = "";
  campo: string = "Cedula incompleta!";



  constructor(private estudianteService: EstudianteService,
    private matriculaService: MatriculaService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarMallas();
    // this.matriculaService.getPeronas()
    // .subscribe(persona => this.personas=persona);


    this.estudianteService.getEstudiantePersonas()
      .subscribe(persona => this.personas = persona);
  }

  matriculaFormulario: FormGroup = this.fb.group({
    cedula: [],
    nameComplete: ['', [Validators.required]],
    nacimiento: [''],
    genero: ['', [Validators.required]],
    Rcedula: ['', [Validators.required]],
    RnameComplete: ['', [Validators.required]],
    Rcurso: ['', [Validators.required]],
    Rfecha: ['', [Validators.required]],
    Rmodalidad: ['', [Validators.required]],
    Rlectivo: ['', [Validators.required]],
    callePrincipal: ['', [Validators.required]],
    calleSecundaria: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    canton: ['', [Validators.required]],
    parroquia: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    celular: ['', [Validators.required]],
    email: ['', [Validators.required]],
    inscripcion: [[], [Validators.required]],
    copCedula: [[], [Validators.required]],
    copVotacion: [[], [Validators.required]],
    certMatricula: [[], [Validators.required]],
    periodo: [[], [Validators.required]],
    malla: [[],],
    curso: [[], [Validators.required]],
    paralelo: [[], [Validators.required]],
    jornada: [[], [Validators.required]]
  });



  cargarCursos() {

  
    this.matriculaFormulario.controls['paralelo'].setValue([]);
    this.matriculaFormulario.controls['jornada'].setValue([]);
    this.matriculaFormulario.controls['periodo'].setValue([]);
    this.matriculaFormulario.controls['curso'].setValue([]);
    this.matriculaFormulario.controls['Rmodalidad'].setValue('');
    this.matriculaFormulario.controls['Rlectivo'].setValue('');
    this.matriculaFormulario.controls['Rcurso'].setValue('');
    this.cargarPeriodo();
    let filtered: any[] = [];
    filtered.push(this.mallaSelectd.listaCursos);
    for (let i = 0; i < filtered.length; i++) {
      let curso = filtered[i];
      this.cursos = curso;

    }

    this.cargarModalidadesPorMalla();

  }
  buscar() {
    if (this.personaSelectd.cedula !== "") {
      this.estudianteService.getEstudiantePorCedula(this.personaSelectd.cedula.trim())
        .subscribe(estudiante => {
          this.estudiante = estudiante
          this.matricula.estudiante = estudiante;
          this.matricula.fechaMatricula = new Date();
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


  guardarMatricula() {

    if (this.matriculaFormulario.invalid) {
      this.matriculaFormulario.markAllAsTouched();
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'El formulario contiene errores o campos vacios.' });
      return;
    }

    this.user.id_usuario = this.authService.usuario.id_usuario;
    this.matricula.usuario = this.user;
    this.matriculaService.postMatricula(this.matricula)
      .subscribe(newMatricula => {
        this.messageService.add({ key: 'tc', severity: 'success', summary: 'Nueva Matricula', detail: `Matricula creada con exito!` });
        this.enviarCorreo(newMatricula);
        this.limpiarFormulario();
      });

  }

  enviarCorreo(matricula: Matricula) {
    
    if (this.selectedRequerimientos.length!=0) {
      for (let i = 0; i < this.selectedRequerimientos.length; i++) {
        this.listRequerimientos+=this.selectedRequerimientos[i]+"-";
      }
    }else{
      this.listRequerimientos="vacio";
    }
    
    this.matriculaService.sendEmail(matricula, this.listRequerimientos)
    .subscribe(res => console.log(res));
    
  }
  cargarModalidadesPorMalla() {
    let filtered: any[] = [];
    filtered.push(this.mallaSelectd.id_modalidad);
    this.modalidades = filtered;
    console.log(this.modalidades);
    this.matriculaService.getParalelos()
      .subscribe(paralelos => {
        this.paralelos = paralelos;
      })
  }

  campoValido(valor: string): boolean {
    return this.matriculaFormulario.controls[valor].errors!
      && this.matriculaFormulario.controls[valor].touched
  }

  obtenerPeriodo() {
    this.matricula.id_periodo = this.peridoSelectd;
  }
  obtenerModalidad() {
    this.matricula.modalidad = this.modalidadSelectd;
  }
  obtenerParalelo() {
    this.matricula.id_paralelo = this.paraleloSelectd;
  }

  obtenerCurso() {
    this.matricula.curso = this.cursoSelectd;
  }

  cargarPeriodo() {

    this.matriculaService.getPeriodoPorMalla(this.mallaSelectd.id_malla!)
      .subscribe({
        next: (periodo) => {
          this.periodos = periodo;
          
        },
      });
      console.log(this.periodos);
  }
  limpiarFormulario() {
    this.activeIndex1 = 0;
    this.selectedRequerimientos = [];
    this.matricula = new Matricula();
    this.estudiante = new Estudiante();
    this.matriculaFormulario.controls['curso'].setValue([]);
    this.matriculaFormulario.controls['periodo'].setValue([]);
    this.matriculaFormulario.controls['paralelo'].setValue([]);
    this.matriculaFormulario.controls['jornada'].setValue([]);
    this.matriculaFormulario.controls['nacimiento'].setValue([]);
    this.listRequerimientos="";
    this.fullName = "";
    this.cursos = [];
    this.modalidades = [];
    this.paralelos = [];
    this.periodos = [];
    this.mallas = [];
    this.mallaSelectd = new Malla();
    this.cargarMallas();
  }

  cargarMallas() {
    this.matriculaService.getAllMalla()
      .subscribe(malla => { this.mallas = malla });
  }
}
