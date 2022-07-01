import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { CertificadoMatricula } from 'src/app/Model/Secretaria/certificadoMatricula';
import { MatriculaService } from 'src/app/Servicio/moduloMatricula/matriculaServices/matricula.service';
import { Matricula } from 'src/app/Model/Matriculas/matricula';
import { CertificadoMatriculaServiceService } from 'src/app/Servicio/secretaria/certificadosService/certificado-matricula-service.service';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { GenerarPdfService } from 'src/app/Servicio/secretaria/certificadosService/generar-pdf.service';
import { ReimprimirMatService } from 'src/app/Servicio/secretaria/certificadosService/reimprimirMat.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Servicio/auth/auth.service';
import { direccion } from 'src/app/Model/rolesTS/direccion';
import { MensajesSweetService } from 'src/app/Servicio/modulo_invetario/mensajes-sweet.service';

@Component({
  selector: 'app-generar-certificadomatricula',
  templateUrl: './generar-certificadomatricula.component.html',
  styleUrls: ['./generar-certificadomatricula.component.scss']
})
export class GenerarCertificadomatriculaComponent implements OnInit {
  certificadoMatricula: CertificadoMatricula[]=[];
  estudiantes: Estudiante[]=[];
  matriculas: Matricula[]=[];
  matricula: Matricula = new Matricula;

  selectMatricula?: Matricula| null;
  displayMatricula: boolean = false;
  selectCertMatricula?: CertificadoMatricula| null;
  displayCertificado: boolean = false;

  fechaActual: Date = new Date();

  empleados: empleado[]=[];
  selectSecretaria?: empleado| null;
  selectRector?: empleado| null;

  public certificadoMatriculaForm: FormGroup = this._formBuilder.group({
    rectora: [],
     
    id_empleado: [], 
    id_matricula: [],
     
  })
  


  constructor(private router: Router
    ,private matriculaService: MatriculaService
    ,private _certificadoMatriculaService: CertificadoMatriculaServiceService
    ,private _generarPdfService: GenerarPdfService
    ,private _formBuilder: FormBuilder
    ,private _reimprimirCertMat: ReimprimirMatService
    ,private _authService: AuthService
    ,private _mensajeSweetService: MensajesSweetService) { }

  ngOnInit(): void {
    this.getMatriculas();
    this.getEmpleados();
    this.getCertificadosMatriculaAll();
  }

  getMatriculas(){
    this.matriculaService.getMatricula()
    .subscribe(certificado=>{
      console.log(certificado);
      this.matriculas=certificado;
      
    })
  }

  getEmpleados(){
    this._certificadoMatriculaService.getEmpleados().subscribe({
      next: (resp)=>{
        console.log(resp);
        this.empleados = resp;
      }
    })
  }

  getMatriculaPorCedula(event: any){
    console.log(event.value);
    let cedula = event.value.trim();
    
    if (cedula.length == 0)return;
    this.matriculaService.getMatriculaPorCedula(cedula).subscribe({
      next:(resp)=>{
        console.log(resp);
        this.matriculas=resp;
      },
      error:(error)=>{
        console.log(error)} 
    })
  }

  getCertificadosMatriculaAll(){
    this._certificadoMatriculaService.getCertificadoMatriculaAll()
    .subscribe(certificadoMatri=>{
      console.log(certificadoMatri);
      this.certificadoMatricula=certificadoMatri;
      
    })
  }

  getCertificadoMatriculaPorCedula(event: any){
    console.log(event.value);
    let cedulaCert = event.value.trim();

    if (cedulaCert.length == 0)return;
    this._certificadoMatriculaService.getCertificadoMatriculaPorCedula(cedulaCert).subscribe({
      next:(resp)=>{
        console.log(resp);
        this.certificadoMatricula=resp;
      },
      error:(error)=>{
        console.log(error)} 
    })
    
  }

  crearCertificado(){
    console.log(this.certificadoMatriculaForm.value);
    if (this.certificadoMatriculaForm.invalid) {
      this.certificadoMatriculaForm.markAllAsTouched();
      return;
    }
    let {rectora, fecha, id_empleado, id_matricula} = this.certificadoMatriculaForm.value;

    let certificadoMatriculas: CertificadoMatricula = {
      rectora: '',
      fecha: new Date,
      id_empleado: this._authService.usuario.empleado!,
      id_matricula: this.matricula
    }

    this._certificadoMatriculaService.crearCertificadoMatricula(certificadoMatriculas).subscribe({
      next: (resp)=>{
        console.log(resp);
        
        this.certificadoMatriculaForm.reset();
        this.matricula= new Matricula();
        this._mensajeSweetService.mensajeOk('Certificado guardado con exito');
      },
      error: (error)=>{
        console.log(error);
        this._mensajeSweetService.mensajeError('Ups!','No se pudo guardar el certificado');
      }
    });
    console.log(certificadoMatriculas);
    
  }


  regresarHome(){
    this.router.navigate(["home"]);
  }   

  generarPdf(imprimir: boolean){
    this._generarPdfService.generarCertificado(this.selectMatricula!,this.selectSecretaria!,this.selectRector!, imprimir);
  }
  
  showDialog(matricula: Matricula) {
    this.selectMatricula = matricula;
    this.displayMatricula = true;
  }
  closeDialog() {
    this.displayMatricula = false;
    this.selectMatricula = null;
    this.selectRector = null;
    this.selectSecretaria = null;
  }

  reimprimirCert(imprimir: boolean){
    this._reimprimirCertMat.generarCertificadoMatricula(this.selectCertMatricula!, imprimir);
  }

  verDialog(certificadoMat: CertificadoMatricula){
    this.selectCertMatricula = certificadoMat;
    this.displayCertificado = true;
  }

  cerrarDialog(){
    this.selectCertMatricula = null;
    this.displayCertificado = false;
  }

}
