import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { CertificadoPromocion } from 'src/app/Model/Secretaria/certificadoPromocion';
import { MatriculaService } from 'src/app/Servicio/moduloMatricula/matriculaServices/matricula.service';
import { Matricula } from 'src/app/Model/Matriculas/matricula';
import { CertificadoPromocionServiceService } from 'src/app/Servicio/secretaria/certificadosService/certificado-promocion-service.service';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { GenerarPdfService } from 'src/app/Servicio/secretaria/certificadosService/generar-pdf.service';


import { PdfService } from 'src/app/Servicio/secretaria/certificadosService/pdf.service';
import { Registro } from 'src/app/Model/tutorias/registro';
import { ServiceTutoriasService } from 'src/app/Servicio/tutorias/registro/servicio-tutorias.service';
import { MensajesSweetService } from '../../../../Servicio/modulo_invetario/mensajes-sweet.service';
import { ConvertirNumerosLetras } from './convertir-num-letras';
import { CertificadoTablaPromocion } from '../../../../Model/Secretaria/certificadoPromocion';

@Component({
  selector: 'app-generar-certificadopromocion',
  templateUrl: './generar-certificadopromocion.component.html',
  styleUrls: ['./generar-certificadopromocion.component.scss']
})
export class GenerarCertificadopromocionComponent implements OnInit {

  certificadoPromocion: CertificadoPromocion[] = [];
  estudiantes: Estudiante[] = [];
  matriculas: Matricula[] = [];
  registros: Registro[] = [];

  selectMatricula?: Matricula | null;
  displayMatricula: boolean = false;
  selectRegistro?: Registro  | null;
  selectRegistros: Registro[]  = [];

  fechaActual: Date = new Date();

  empleados: empleado[] = [];
  selectSecretaria?: empleado | null;
  selectRector?: empleado | null;

  public sumaNotas: number = 0;
  public sumaConducta: number = 0;
  public promedio: number = 0;
  public promedioConducta: number = 0;
  public numero_a_letras: Number = 0;
  public tipoConducta?: { tipo: string, desc: string} ;
  public cursoPromovido: string = '';

  public certificadoTabla: CertificadoTablaPromocion [] = [];

  constructor(private router: Router,
    private _matriculaService: MatriculaService,
    private registroService: ServiceTutoriasService,
    private _certificadoPromocionService: CertificadoPromocionServiceService,
    private _mensajeSweetService: MensajesSweetService, 
    private _generarPdfService: PdfService) { }

  ngOnInit(): void {
    
    this.getEmpleados();
    this.getMatriculas();
  }

  getEmpleados() {
    this._certificadoPromocionService.getEmpleados().subscribe({
      next: (resp) => {
        console.log(resp);
        this.empleados = resp;
      }
    })
  }

  getMatriculas(){
    this._matriculaService.getMatricula()
    .subscribe(certificado=>{
      console.log(certificado);
      this.matriculas=certificado;
      
    })
  }


  //new
  getCedulaPorEstudiante(event: any) {
    console.log(event.value);
    let cedula = event.value.trim();
    if (cedula.length == 0){};
    this._matriculaService.getMatriculaPorCedula(cedula).subscribe({
      next: (resp) => {
        if (resp.length === 0) {
          this._mensajeSweetService.mensajeError('Upss', `No hay estudiantes con CI: ${cedula}`);
          return;
        }
        this.matriculas = resp;
      },
      error: (error) => {
        this.matriculas = [];
        this.getMatriculas();
      }
    })
  }

  regresarHome() {
    this.router.navigate(["home"]);
  }

  generarPdf(imprimir: boolean) {
    if (this.selectRector && this.selectSecretaria) {
      if (this.cursoPromovido.length > 2) {
        this._generarPdfService.generarCertificado(
          this.selectMatricula!, 
          this.selectSecretaria!, 
          this.selectRector!,
          imprimir, 
          this.cursoPromovido, 
          this.certificadoTabla);
        this.closeDialog();
      } else {
        this._mensajeSweetService.mensajeError('Por favor', 'Ingrese el curso a promover en la caja de texto')
      }
    } else {
      this._mensajeSweetService.mensajeError('Por favor', 'Seleccione al Rector/a y Secretario/a')
    }
  }

  showDialog(matricula: Matricula) {
    this.selectMatricula = matricula;
    this.getRegistrosPorIdMatricula();
    this.displayMatricula = true;
  }

  getRegistrosPorIdMatricula = () => {
    this.registroService.getRegistrosByMatriculaId(this.selectMatricula?.id_matricula!).subscribe({
      next: ( resp ) => {
        this.selectRegistros = resp.registro;
        this.sacarPromedioGeneral();
        this.verifivarTipoconducta();
        if (this.selectRegistros.length === 0) {
          this._mensajeSweetService.mensajeError('Aviso', 'Este estudiante no tiene asignaturas');
          this.closeDialog();
        }
        console.log(this.selectRegistros);
      },
      error: (error) => console.log(error)
    })
  }

  convertirNumeroLetras = (num: number) => {
    if (num % Math.trunc(num) === 0 ) {
      let strUnidad: string = new ConvertirNumerosLetras().Unidades(num);
      return `${strUnidad} `;
    }
    let unidad = Math.trunc(num);
    let strDe = num.toString();
    let indice = strDe.indexOf('.') + 1;
    let decimales = strDe.substring(indice);
    let strUnidad: string = new ConvertirNumerosLetras().Unidades(unidad);
    let strDecenas: string = '';
    let i: string = (+decimales).toString();    
    if (decimales.length  === 2 && i.length < 2) {      
      strDecenas = new ConvertirNumerosLetras().Decenas(+decimales, true);
    } else {
      strDecenas = new ConvertirNumerosLetras().Decenas(+decimales, false);
    }
    return `${strUnidad} COMA ${strDecenas}`;
  }

  verificarNotaFinal = (registro: Registro): Number=> {
    if ( registro.nota_final >= 7) {
      this.numero_a_letras = registro.nota_final;
      return registro.nota_final;
    } else if ( registro.examen_supletorio >= 7) {
      this.numero_a_letras = registro.examen_supletorio;
      return registro.examen_supletorio;
    } else if ( registro.examen_remedial >= 7) {
      this.numero_a_letras = registro.examen_remedial;
      return registro.examen_remedial;
    } 
    this.numero_a_letras = registro.examen_gracia;
    return registro.examen_gracia;
  }

  verificarNotaFinalData = (registro: Registro)=> {
    if ( registro.nota_final >= 7) {
      this.certificadoTabla.push({asignatura: registro.asignatura, numero: registro.nota_final.toString(), letras: this.convertirNumeroLetras(+registro.nota_final)});
      return;
    } else if ( registro.examen_supletorio >= 7) {
      this.certificadoTabla.push({asignatura: registro.asignatura, numero: registro.examen_supletorio.toString(), letras: this.convertirNumeroLetras(+registro.examen_supletorio)});
      return;
    } else if ( registro.examen_remedial >= 7) {
      this.certificadoTabla.push({asignatura: registro.asignatura, numero: registro.examen_remedial.toString(), letras: this.convertirNumeroLetras(+registro.examen_remedial)});
      return;
    } 
    this.certificadoTabla.push({asignatura: registro.asignatura, numero: registro.examen_gracia.toString(), letras: this.convertirNumeroLetras(+registro.examen_gracia)});
    return;

  }

  sacarPromedioGeneral = () => {
    for (const registro of this.selectRegistros) {
      this.verificarNotaFinalData(registro);
      this.sumaNotas +=   +this.verificarNotaFinal(registro);
      this.sumaConducta += +registro.conducta;
    }
    console.log(this.sumaNotas);
    this.promedio = +(this.sumaNotas / this.selectRegistros.length).toFixed(2)
    this.certificadoTabla.push({asignatura:'PROMEDIO GENERAL', numero: this.promedio.toString(), letras: this.convertirNumeroLetras(this.promedio)})
    this.promedioConducta = +(this.sumaConducta / this.selectRegistros.length).toFixed(2)
    this.certificadoTabla.push({asignatura:'EVALUCACION DEL COMPORTAMIENTO', numero: this.verifivarTipoconducta().tipo, letras: this.verifivarTipoconducta().desc})
  }


  verifivarTipoconducta () {
    if ( this.promedioConducta >= 9) {
      this.tipoConducta = {tipo: 'A', desc: 'Lidera el cumplimiento de los compromisos establecidos para la sana convivencia social.'}
      return this.tipoConducta;
    } else if ( this.promedioConducta >= 7 && this.promedioConducta < 9) {
      this.tipoConducta = {tipo: 'B', desc: 'Cumple con los compromisos establecidos para la sana convivencia social.'}
      return this.tipoConducta;
    } else if ( this.promedioConducta >= 5 && this.promedioConducta < 7) {
      this.tipoConducta = {tipo: 'C', desc: 'Falla ocasionalmente en el cumplimiento de los compromisos establecidos para la sana convivencia social.'}
      return this.tipoConducta;
    } else if ( this.promedioConducta >= 3 && this.promedioConducta < 5) {
      this.tipoConducta = {tipo: 'D', desc: 'Falla reiteradamente en el cumplimiento de los compromisos establecidos para la sana convivencia social.'}
      return this.tipoConducta;
    } 
    this.tipoConducta = {tipo: 'E', desc: 'No cumple con los compromisos establecidos para la sana convivencia social.'}
    return this.tipoConducta;

  }

  closeDialog() {
    this.sumaNotas = 0;
    this.sumaConducta = 0;
    this.promedio = 0;
    this.promedioConducta = 0;
    this.cursoPromovido = '';
    this.displayMatricula = false;
    this.selectRegistro = null;
    this.selectRegistros = [];
    this.selectMatricula = null;
    this.selectRector = null;
    this.selectSecretaria = null;
    this.certificadoTabla = [];
  }

}
