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

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
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
  cols: any[] = [];
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
    this.cols = [
      { field: '1', header: 'Code' },
      { field: '2', header: 'Name' },
      { field: '3', header: 'Category' },
      { field: '4', header: 'Quantity' }
  ];
    this.getCursos();
    this.getParalelos();
    this.getModalidades();
    this.getPeriodos();
    this.getEmpleados();

  }

  

  getCursos = () => {
    this._cursoService.getAllCursos().subscribe({
      next:(resp) => {
        this.cursos = resp;
      },
      error: (error) => {
        this.cursos = [];
      }
    })
  }
  getParalelos = () => {
    this._paraleloService.getAllParalelo().subscribe({
      next:(resp) => {
        this.paralelos = resp;
      },
      error: (error) => {
        this.paralelos = [];
      }
    })
  }
  getModalidades = () => {
    this._periodoService.getAllModalidad().subscribe({
      next:(resp) => {
        this.modalidades = resp;
      },
      error: (error) => {
        this.modalidades = [];
      }
    })
  }
  getPeriodos = () => {
    this._periodoService.getAllPerdiodo().subscribe({
      next:(resp) => {
        this.periodos = resp;
      },
      error: (error) => {
        this.periodos = [];
      }
    })
  }

  getEmpleados() {
    this._certificadoPromocionService.getEmpleados().subscribe({
      next: (resp) => {
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
          if (this.registros.length === 0) {
            this._mensajeSweetService.mensajeInfo('', 'No se encontraron datos con esos parametros')
            this.closeDialog();
            return;
          }
          
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
            return 0;
          });

          for (const k in notas) {
            notas[k].ord = +k+1;
            notas[k].notasPQ = [];
            notas[k].notasEG = [];
            notas[k].notasPF = [];
            for (const i in data) {
              if (notas[k].cedula === data[i][4]) {
                notas[k].materias?.push(data[i][3]);
                notas[k].notasQ1?.push(+data[i][5]);
                notas[k].notasQ2?.push(+data[i][6]);
                notas[k].notasPQ?.push(+data[i][7]);
                notas[k].notasEG?.push(+data[i][8]);
                if(data[i][7] >= 7){
                  notas[k].notasPF?.push(+data[i][7]);
                } else {
                  notas[k].notasPF?.push(+data[i][8]);
                }
                notas[k].notasPF?.push();
                notas[k].conductas?.push(+data[i][9]);                
              }
            }
          }
          this.notasPdf = notas;
          this.materias = materias;
        },
        error: (error) => {
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
        if (this.selectRector && this.selectSecretaria) {
          this._mensajeSweetService.showLoading(false, 'Espere por favor', 'Generando reporte')
          this.cargarNotas();
          this.downloadPDF(imprimir);
        } else {
          this._mensajeSweetService.mensajeError('Por favor', 'Seleccione al rector y secretaria')
        }
        
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

  cargarNotas = () => {
    let headers = document.getElementById('subHeader');
    for (const i in this.materias) {
      let thPQ = document.createElement('th');
      thPQ.textContent = 'PQ';
      let thEG = document.createElement('th');
      thEG.textContent = 'EG';
      let thPF = document.createElement('th');
      thPF.textContent = 'PF';
      headers?.appendChild(thPQ)
      headers?.appendChild(thEG)
      headers?.appendChild(thPF)
    }

    for (const j in this.notasPdf) {
      let id = `notasTabla${j}`

      let notasTabla = document.getElementById(id);
      for (const i in this.materias) {
        let tdPQ = document.createElement('td');
        //@ts-ignore
        tdPQ.textContent = this.notasPdf[j].notasPQ[i].toString();
        let tdEG = document.createElement('td');
        //@ts-ignore
        tdEG.textContent = this.notasPdf[j].notasEG[i].toString();
        let tdPF = document.createElement('td');
        //@ts-ignore
        tdPF.textContent = this.notasPdf[j].notasPF[i].toString();

        notasTabla?.appendChild(tdPQ)
        notasTabla?.appendChild(tdEG)
        notasTabla?.appendChild(tdPF)
      }
    }
  }

  calcularPromedio = (nota: Notas) => {  
    let promedio = (nota.notasPF!.reduce((a, b) => a + b, 0)) / nota.notasPF!.length;
    return promedio.toFixed(2);
  }
  tipoObservacion = (nota: Notas) => {  
    let promedio = (nota.notasPF!.reduce((a, b) => a + b, 0)) / nota.notasPF!.length;
    let observacion = 'RETIRADO';
      if (promedio >= 7) {
        observacion = 'APROBADO';
      } else if( promedio > 0 && promedio < 7 ) {
        observacion = 'REPROBADO';
      }
    return observacion;
  }
  calcularConducta = (nota: Notas) => {  
    let promedio = (nota.conductas!.reduce((a, b) => a + b, 0)) / nota.conductas!.length;
    return this._segundoQuimestreService.verifivarTipoconducta(promedio);
  }

  downloadPDF( imprimir: boolean) {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('landscape');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA!, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      Swal.close();
      this.closeDialog();
      if (imprimir) {
        docResult.autoPrint();
        docResult.output('dataurlnewwindow');
      } else {
        docResult.save(`${new Date().toISOString()}_cuadro_final.pdf`);
      }
    });
  }
}
