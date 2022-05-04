import { Component, OnInit } from '@angular/core';
import { provincia } from '../../../../Model/rolesTS/provincia';
import { EstudianteService } from '../../../../Servicio/moduloMatricula/estudianteServices/estudiante.service';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { genero } from '../../../../Model/rolesTS/genero';
import { canton } from '../../../../Model/rolesTS/canton';
import { parroquia } from '../../../../Model/rolesTS/parroquia';
import { pais } from '../../../../Model/rolesTS/pais';
import { extension } from '../../../../Model/rolesTS/extension';
import swal from 'sweetalert2';


@Component({
  selector: 'app-agregar-estudiante',
  templateUrl: './agregar-estudiante.component.html',
  styleUrls: ['./agregar-estudiante.component.scss']
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
  paises: pais[] = [];
  activeIndex1: number = 0;
  cedula: string = "";
  existe: boolean = true;
  display: boolean = false;
  nombre: string = "";
  mens: string = "";
  campo: string = "Cedula incompleta!";
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  estudentFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    apellido: [, [Validators.required, Validators.minLength(3)]],
    cedula: [, [Validators.required, Validators.minLength(10)]],
    fecha: [, [Validators.required]],
    genero: [, [Validators.required]],
    provincia: [, [Validators.required]],
    canton: [, [Validators.required]],
    parroquia: [, [Validators.required]],
    calleFirts: [, [Validators.required]],
    pais: [, [Validators.required]],
    calleSecond: [, [Validators.required]],
    extension: [, [Validators.required]],
    telefono: [, [Validators.required]],
    celular: [, [Validators.required]],
    email: [, [Validators.required, Validators.pattern(this.emailPattern)]]
  })



  constructor(private estudianteService: EstudianteService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.estudianteService.getProvincias()
      .subscribe(provincia => this.provincias = provincia);
    this.estudianteService.getGenero()
      .subscribe(genero => this.generos = genero);

    this.estudianteService.getPais()
      .subscribe(pais => this.paises = pais);

    this.estudianteService.getParroquia()
      .subscribe(parroquia => this.parroquias = parroquia);

    this.estudianteService.getCanton()
      .subscribe(canton => this.cantones = canton);

    this.estudianteService.getExtension()
      .subscribe(extension => this.extensiones = extension);
  }


  // desde aqui


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
    if (this.estudentFormulario.invalid) {
      this.estudentFormulario.markAllAsTouched();
      swal.fire('Error en Formulario', 'Campos erroneos o incompletos', 'error');
      return;
    }

    if (!this.existe) {
      this.estudiante.estadoEstudiante = true;
    console.log(this.estudiante)
    this.estudianteService.postEstudiante(this.estudiante)
      .subscribe(newEstudent => {
        swal.fire('Nuevo Estudiante', `Nuevo id: ${newEstudent.id_estudiante} creado con exito!`, 'success')

      });
    }else{
      swal.fire('Estudiante Encontrado', `El estudiante con cedula: ${this.estudiante.id_persona.cedula}, ya existe`,'error')
    }
    
  }

  validaExistenciaEstudiante(): boolean {
    this.estudianteService.getEstudiantePorCedula(this.estudiante.id_persona.cedula.trim())
      .subscribe(estudiante => {
        swal.fire('Estudiante Encontrado', `El estudiante con cedula: ${this.estudiante.id_persona.cedula}, ya existe`,'error')
        return this.existe=true;
      });
    return this.existe=false;
  }
  // validaciones de campos del formulario
  campoValido(valor: string): boolean {
    return this.estudentFormulario.controls[valor].errors!
      && this.estudentFormulario.controls[valor].touched
  }


}
