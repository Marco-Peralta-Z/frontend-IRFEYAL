import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { Matricula } from 'src/app/Model/Matriculas/matricula';
import { EstudianteService } from 'src/app/Servicio/moduloMatricula/estudianteServices/estudiante.service';
import { MatriculaService } from 'src/app/Servicio/moduloMatricula/matriculaServices/matricula.service';
import { CursosService } from '../../../../Servicio/parametrizacion/Service Curso/cursos.service';
import { Curso } from '../../../../Model/Parametrizacion/Curso';
import { Modalidad } from '../../../../Model/Parametrizacion/Modalidad';
import { PeriodoService } from '../../../../Servicio/parametrizacion/Service Periodo/periodo.service';
import { Periodo } from '../../../../Model/Parametrizacion/Periodo';
import { ServiceTutoriasService } from '../../../../Servicio/tutorias/registro/servicio-tutorias.service';
import { MensajesSweetService } from '../../../../Servicio/modulo_invetario/mensajes-sweet.service';
import { Nomina } from '../../../../Model/Secretaria/nomina';
import { Registro } from '../../../../Model/tutorias/registro';
import { Paralelo } from '../../../../Model/Parametrizacion/Paralelo';
import { ParaleloeService } from '../../../../Servicio/parametrizacion/Service Paralelo/paraleloe.service';

@Component({
  selector: 'app-nomina-estudiantil',
  templateUrl: './nomina-estudiantil.component.html',
  styleUrls: ['./nomina-estudiantil.component.scss']
})
export class NominaEstudiantilComponent implements OnInit {

  public selectedMatricula: Matricula[] = [];

  matriculas: Matricula[] = [];
  estudiantes: Estudiante[] = [];

  public cursos: Curso [] = [];
  public selectCurso?: Curso;
  public paralelos: Paralelo [] = [];
  public selectParalelo?: Paralelo;
  public modalidades: Modalidad [] = [];
  public selectModalidad?: Modalidad;
  public periodos: Periodo [] = [];
  public selectPeriodo?: Periodo;
  public registros: Registro [] = [];
  public dataNomina: Nomina [] = [];
  data = Object.values(this.matriculas);
  constructor(
    private matriculaService: MatriculaService, 
    private estudianteService: EstudianteService,
    private _registroService: ServiceTutoriasService,
    private _cursoService: CursosService, 
    private _paraleloService: ParaleloeService,
    private _periodoService: PeriodoService,
    private _mensajeSweetService: MensajesSweetService, 
  ) {
  }
  
  ngOnInit(): void {
    this.getCursos();
    this.getParalelos();
    this.getModalidades();
    this.getPeriodos();

  }

  getCursos = () => {
    this._cursoService.getAllCursos().subscribe({
      next:(resp) => {
        console.log(resp);
        this.cursos = resp;
      },
      error: (error) => {
        console.log(error);
        this.cursos = [];
      }
    })
  }
  getParalelos = () => {
    this._paraleloService.getAllParalelo().subscribe({
      next:(resp) => {
        console.log(resp);
        this.paralelos = resp;
      },
      error: (error) => {
        console.log(error);
        this.paralelos = [];
      }
    })
  }
  getModalidades = () => {
    this._periodoService.getAllModalidad().subscribe({
      next:(resp) => {
        console.log(resp);
        this.modalidades = resp;
      },
      error: (error) => {
        console.log(error);
        this.modalidades = [];
      }
    })
  }
  getPeriodos = () => {
    this._periodoService.getAllPerdiodo().subscribe({
      next:(resp) => {
        console.log(resp);
        this.periodos = resp;
      },
      error: (error) => {
        console.log(error);
        this.periodos = [];
      }
    })
  }

  getRegistrosPorIdCurModPer = () => {
    if ( this.selectCurso && this.selectParalelo && this.selectModalidad && this.selectPeriodo ) {
      this._registroService.getRegistrosByIdCurModPer(this.selectCurso.id_curso, this.selectModalidad.id_modalidad, this.selectPeriodo.id_periodo, +this.selectParalelo.id_paralelo)
      .subscribe({
        next:(resp) => {
          console.log(resp);
          this.registros = resp.registro;
          console.log(resp.registro)
          this.filtarDataNomina();
        },
        error: (error) => {
          console.log(error);
          this.registros = [];
        }
      })
    } else {
      this._mensajeSweetService.mensajeError('Por favor', 'Seleccione los parámetros de búsqueda')
    }
  }

  
  filtarDataNomina = () => {
    console.log('proximamanete');
    
  }

}
