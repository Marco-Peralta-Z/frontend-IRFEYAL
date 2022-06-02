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
import { DatePipe } from '@angular/common';


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
  paises: pais[] = [];
  activeIndex1: number = 0;
  cedula: string = "";
  existe: boolean = true;
  display: boolean = false;
  nombre: string = "";
  mens: string = "";

  campo: string = "Cedula incompleta!";
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  cedulaPattern: string = "[0-9]{10}";
  // variables de metodo para validar la cedula
  tama: number = 0;
  error?: boolean;
  fin?: number;
  resta?: number;
  mostrar?: string;
  num?: number;

  multi?: number;
  expo?: number;
  suma?: number;
  num1?: number;
  p?: number;
  noPuedeSerNull(control: FormControl) {
    const fecha = control.value;
    if (fecha == Date()) {
      return {
        fecha: true
      }
    }
    return null;
  }
  estudentFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    apellido: [, [Validators.required, Validators.minLength(3)]],
    cedula: [, [Validators.required, Validators.pattern(this.cedulaPattern)]],
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
    private fb: FormBuilder, private messageService: MessageService) { }

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
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error en Formulario', detail: 'Campos erroneos o incompletos' });
      // swal.fire('Error en Formulario', 'Campos erroneos o incompletos', 'error');
      return;
    }

    if (!this.existe && this.error) {
      this.estudiante.estadoEstudiante = true;
      this.estudiante.direccion.pais.id_pais = 1;
      this.estudianteService.postEstudiante(this.estudiante)
        .subscribe(newEstudent => {
          this.messageService.add({ key: 'tc', severity: 'success', summary: 'Nuevo Estudiante', detail: `Nuevo id: ${newEstudent.id_estudiante} creado con exito!` });
          this.activeIndex1 = 0;
          this.estudentFormulario.reset();
          // swal.fire('Nuevo Estudiante', `Nuevo id: ${newEstudent.id_estudiante} creado con exito!`, 'success')

        });
    } else {
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Estudiante Encontrado', detail: `El estudiante con cedula: ${this.estudiante.id_persona.cedula}, ya existe` });
      // swal.fire('Estudiante Encontrado', `El estudiante con cedula: ${this.estudiante.id_persona.cedula}, ya existe`,'error')
    }

  }

  validaExistenciaEstudiante(): boolean {
    this.validarCedu(this.estudiante.id_persona.cedula.trim());
    this.estudianteService.getEstudiantePorCedula(this.estudiante.id_persona.cedula.trim())
      .subscribe(estudiante => {
        this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Estudiante Encontrado', detail: `El estudiante con cedula: ${this.estudiante.id_persona.cedula}, ya existe` });
        // swal.fire('Estudiante Encontrado', `El estudiante con cedula: ${this.estudiante.id_persona.cedula}, ya existe`,'error')
        return this.existe = true;
      });
    return this.existe = false;
  }
  // validaciones de campos del formulario
  campoValido(valor: string): boolean {
    return this.estudentFormulario.controls[valor].errors!
      && this.estudentFormulario.controls[valor].touched
  }


  validarCedu(cedu: string): boolean {
    this.tama = cedu.length;
    this.error = true;
    this.resta = 0;
    this.fin = 1;
    if (this.tama == 10) {
      this.mostrar = "";

      for (let i = 0; i < cedu.length; i++) {
        const letra = cedu.charAt(i);
        this.num = Number(letra);
        this.fin = this.num;
      }
    } else {
      this.error = false;

    }
    if (this.error) {
      this.multi = 0;
      this.expo = 0;
      this.suma = 0;

      for (let i = 0; i < cedu.length - 1; i++) {
        const letra = cedu.charAt(i);
        this.num1 = Number(letra);
        if (this.expo == i) {
          this.multi = this.num1 * 2;
          this.expo = this.expo + 2;
          if (this.multi >= 10) {
            this.multi = this.multi - 9;
          }
        } else {
          this.multi = this.num1;
        }
        this.suma = this.suma + this.multi;
      }

      this.p = 0;

      for (let j = 0; j <= 100; j++) {
        if (this.p > this.suma || this.p == this.suma) {
          this.resta = this.p - this.suma;
          j = 1000;
        } else {
          this.p = j * 10;
        }

      }

    } else {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error de Datos', detail: `Cedula ingresada incorrecta` });
      this.error = false;
    }
    if (this.error) {
      console.log(this.resta, this.fin)
      if (this.resta == this.fin) {

        this.error = true;

      } else {
        this.messageService.add({ key: 'tc', severity: 'info', summary: 'Validación', detail: `Número de cédula erroneo` });
        this.error = false;
      }
    }
    return this.error;
  }

}
