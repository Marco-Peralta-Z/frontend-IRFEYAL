import { Component, OnInit } from '@angular/core';
import { provincia } from '../../../../Model/rolesTS/provincia';
import { EstudianteService } from '../../../../Servicio/moduloMatricula/estudianteServices/estudiante.service';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { genero } from '../../../../Model/rolesTS/genero';
import { canton } from '../../../../Model/rolesTS/canton';
import { parroquia } from '../../../../Model/rolesTS/parroquia';
import { pais } from '../../../../Model/rolesTS/pais';
import { extension } from '../../../../Model/rolesTS/extension';
import { MessageService } from 'primeng/api';
import { ValidatorsService } from '../../../../Servicio/moduloMatricula/Validators/validators.service';
import { persona } from '../../../../Model/rolesTS/persona';


@Component({
  selector: 'app-agregar-estudiante',
  templateUrl: './agregar-estudiante.component.html',
  styleUrls: ['./agregar-estudiante.component.scss'],
  providers: [MessageService]
})
export class AgregarEstudianteComponent implements OnInit {
  estudiante: Estudiante = new Estudiante();
  filteredProvincia: provincia[] = [];
  filteredCanton: canton[] = [];
  filteredParroquia: parroquia[] = [];
  errores: string[] = [];
  provincias: provincia[] = [];
  generos: genero[] = [];
  cantones: canton[] = [];
  parroquias: parroquia[] = [];
  extensiones: extension[] = [];
  age: number=0;
  paises: pais[] = [];
  activeIndex1: number = 0;
  cedula: string = "";
  existe: boolean = true;
  display: boolean = false;
  nombre: string = "";
  mens: string = "";
  validador?: boolean;
  campo: string = "Cedula incompleta!";
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  cedulaPattern: string = "[0-9]{10}";
  
  
  estudentFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    apellido: [, [Validators.required, Validators.minLength(3)]],
    cedula: [, [Validators.required]],
    fecha: [[], [Validators.required, this.noPuedeSerNull]],
    genero: [[], [Validators.required]],
    provincia: [[], Validators.required],
    canton: [[], [Validators.required]],
    parroquia: [[], [Validators.required]],
    calleFirts: [, [Validators.required]],
    calleSecond: [, [Validators.required]],
    extension: [, [Validators.required]],
    telefono: [, [Validators.required]],
    celular: [, [Validators.required]],
    email: [, [Validators.required, Validators.pattern(this.emailPattern)]]
  })

  constructor(private estudianteService: EstudianteService,
    private fb: FormBuilder, 
    private messageService: MessageService,
    private validatorService: ValidatorsService) { }

  ngOnInit(): void {

    this.estudianteService.getProvincias()
      .subscribe(provincia => {this.provincias = provincia;});

    this.estudianteService.getGenero()
      .subscribe(genero => this.generos = genero);

    this.estudianteService.getPais()
      .subscribe(pais => this.paises = pais);

    this.estudianteService.getExtension()
      .subscribe(extension => this.extensiones = extension);
  
  }

  noPuedeSerNull(control: FormControl) {
    const fecha = control.value; 
    const today: Date = new Date();
    const birthDate: Date = new Date(fecha);
    let edad:number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        edad--;
    }
    if (edad<18) {
      return {
        fecha: true
      }
    }
    return null;
  }

  filtrarProvincia(event: any) {
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

  filtrarParroquia(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.parroquias.length; i++) {
      let parroquia = this.parroquias[i];
      if (parroquia.parroquia.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(parroquia);
      }
    }
    this.filteredParroquia = filtered;
  }

  filtrarCanton(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.cantones.length; i++) {
      let canton = this.cantones[i];
      if (canton.canton.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(canton);
      }
    }
    this.filteredCanton = filtered;
  }

  saveEstudiante() {
    if (this.estudentFormulario.invalid || this.age<18) {
      this.estudentFormulario.markAllAsTouched();
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error en Formulario', detail: 'Campos erroneos o incompletos' });
      // swal.fire('Error en Formulario', 'Campos erroneos o incompletos', 'error');
      return;
    } 

    if (!this.existe) {
      this.estudiante.estadoEstudiante = true;
      this.estudiante.direccion.pais.id_pais = 1;
      this.estudianteService.postEstudiante(this.estudiante)
        .subscribe(newEstudent => {
          this.messageService.add({ key: 'tc', severity: 'success', summary: 'Nuevo Estudiante', detail: `Nuevo Estudiante creado con exito!` });
          this.activeIndex1 = 0;
          this.estudentFormulario.reset();
        });
    } else {
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Estudiante Encontrado', detail: `El estudiante con cedula: ${this.estudiante.id_persona.cedula}, ya existe` });
      
    }

  }

  cargarCantones(){
    this.estudianteService.getCatonPorProvinciaId(this.estudiante.direccion.provincia.idProvincia)
    .subscribe(cantones => this.cantones = cantones);
  }

  cargarParroquias(){
    this.estudianteService.getParroquiaPorCantonId(this.estudiante.direccion.canton.idCanton)
    .subscribe(parroquias => this.parroquias=parroquias)
  }

  CalculateAge() {
     const today: Date = new Date();
    const birthDate: Date = new Date(this.estudiante.id_persona.fechaNacimiento!);
    this.age = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        this.age--;
    }
    if (this.age<18) {
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Menor de Edad', detail: `Fecha ingresada incorrecta`});
    }

}
  validaExistenciaEstudiante(): boolean {
      this.validador=this.validatorService.validarCedu(this.estudiante.id_persona.cedula.trim());
    if (this.validador) {
      this.buscarEstudiante(this.estudiante.id_persona.cedula.trim());
    }else{

        this.validador= this.validatorService.esAlfanumerico(this.estudiante.id_persona.cedula.trim());
        if (this.validador) {
          this.buscarEstudiante(this.estudiante.id_persona.cedula.trim());
        }else{
          this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error de Datos', detail: `Cedula/Pasaporte ingresado incorrecto` });
        }
    }
    
    return this.existe = false;
  }
  // validaciones de campos del formulario
  campoValido(valor: string): boolean {
    return this.estudentFormulario.controls[valor].errors!
      && this.estudentFormulario.controls[valor].touched
  }

buscarEstudiante(valor: string){
  this.estudianteService.getEstudiantePorCedula(valor.trim())
  .subscribe(estudiante => {
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Estudiante Encontrado', detail: `El estudiante con cedula: ${this.estudiante.id_persona.cedula}, ya existe` });
    // swal.fire('Estudiante Encontrado', `El estudiante con cedula: ${this.estudiante.id_persona.cedula}, ya existe`,'error')
    return this.existe = true;
  })
}

}
