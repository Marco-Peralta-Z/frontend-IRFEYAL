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
import { Registro, Notas } from '../../../../Model/tutorias/registro';
import { Paralelo } from '../../../../Model/Parametrizacion/Paralelo';
import { ParaleloeService } from '../../../../Servicio/parametrizacion/Service Paralelo/paraleloe.service';
import { CertificadoPromocionServiceService } from '../../../../Servicio/secretaria/certificadosService/certificado-promocion-service.service';
import { empleado } from '../../../../Model/rolesTS/empleado';
import { PrimerQuimestreService } from '../../../../Servicio/secretaria/promedios/primer-quimestre.service';
import { SegundoQuimestreService } from '../../../../Servicio/secretaria/promedios/segundo-quimestre.service';


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
  public selectCurso?: Curso | null;
  public paralelos: Paralelo [] = [];
  public selectParalelo?: Paralelo | null;
  public modalidades: Modalidad [] = [];
  public selectModalidad?: Modalidad | null;
  public periodos: Periodo [] = [];
  public selectPeriodo?: Periodo | null;
  public registros: string [] = [];
  public dataNomina: Nomina [] = [];

  public tipoPDF: string = 'q1';

  public empleados: empleado[] = [];
  public selectSecretaria?: empleado | null;
  public selectRector?: empleado | null;
  public displayEmpleados: boolean = false;

  public selectedAll: boolean = false;
  data = Object.values(this.matriculas);

  public notasPdf: Notas [] = [];
  public materias: string [] = []; 
  constructor(
    private _certificadoPromocionService: CertificadoPromocionServiceService,
    private _certificadoPromocion: CertificadoPromocionServiceService,
    private _primerQuimestreService: PrimerQuimestreService,
    private _segundoQuimestreService: SegundoQuimestreService,
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
    this.getEmpleados();
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

  getEmpleados() {
    this._certificadoPromocionService.getEmpleados().subscribe({
      next: (resp) => {
        console.log(resp);
        this.empleados = resp;
      }
    })
  }

  getRegistrosPorIdCurModPer = () => {
    if ( this.selectCurso && this.selectParalelo && this.selectModalidad && this.selectPeriodo ) {
      this.selectedAll = true;
      this._certificadoPromocion.getRegistrosByIdCurModPer(this.selectCurso.id_curso, this.selectModalidad.id_modalidad, this.selectPeriodo.id_periodo, +this.selectParalelo.id_paralelo)
      .subscribe({
        next:(resp) => {
          this.registros = resp;
          let notas: Notas []  = [];
          let cedulas: string[] = [];
          let materias: string[] = [];
          let data: any [] = [];

          for (const i in resp) {
            data.push(resp[i].split(','))
          }

          let estNotas: Notas; 
          materias = [...new Set( data.map(est => est[3]))];
          for (const i in materias) {
            materias[i] = materias[i].toUpperCase();
          }
          console.log(materias);
          
          cedulas = [...new Set( data.map(est => est[4]))];

          for (const i in cedulas) {
            let est = data.find(es => es[4] === cedulas[i]);
            estNotas = {nombre: `${est[1]} ${est[0]}`, cedula: cedulas[i], materias: [], notasQ1: [], conductas: []}
            notas.push(estNotas);
            
          }

          notas = notas.sort((a, b) => {
            const nameA = a.nombre!.toUpperCase(); // ignore upper and lowercase
            const nameB = b.nombre!.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });

          for (const k in notas) {
            notas[k].ord = +k+1;
            for (const i in data) {
              if (notas[k].cedula === data[i][4]) {
                notas[k].materias?.push(data[i][3]);
                notas[k].notasQ1?.push(+data[i][5]);
                notas[k].notasQ2?.push(+data[i][6]);
                notas[k].conductas?.push(+data[i][9]);
              }
            }
          }
          console.log(data);
          console.log(notas);
          this.notasPdf = notas;
          this.materias = materias;
          
          
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

  
  generarPDF= (imprimir: boolean) => {
    switch (this.tipoPDF) {
      case 'q1':
        if (this.selectRector && this.selectSecretaria) {
          this._primerQuimestreService
            .generarCertificado(this.selectSecretaria, this.selectRector, imprimir, this.selectPeriodo!,this.selectCurso!, this.notasPdf, this.materias);
          this.closeDialog();
        } else {
          this._mensajeSweetService.mensajeError('Por favor', 'Seleccione al rector y secretaria')
        }
        break;
      case 'q2':
        if (this.selectRector && this.selectSecretaria) {
          this._segundoQuimestreService
            .generarCertificado(this.selectSecretaria, this.selectRector, imprimir, this.selectPeriodo!,this.selectCurso!, this.notasPdf, this.materias);
          this.closeDialog();
        } else {
          this._mensajeSweetService.mensajeError('Por favor', 'Seleccione al rector y secretaria')
        }
        break;
      case 'cn':
        break;
      default:
        break;
    }
    
  }

  showDialog(tipoPDF: string) {
    this.displayEmpleados = true;
    this.tipoPDF = tipoPDF;
  }
  closeDialog() {
    this.displayEmpleados = false;
    this.materias = [];
    this.registros = [];
    this.selectedAll = false;
    this.selectRector = null;
    this.selectSecretaria= null;
    this.selectParalelo = null;
    this.selectCurso= null;
    this.selectPeriodo = null;
    this.selectModalidad = null;
    this.tipoPDF = 'q1';
  }
}
