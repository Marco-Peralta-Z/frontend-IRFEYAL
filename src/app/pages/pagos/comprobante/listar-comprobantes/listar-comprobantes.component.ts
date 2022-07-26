import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Kit } from 'src/app/Model/Inventarios/Kit';
import { Matricula } from 'src/app/Model/Matriculas/matricula';
import { DetalleComprobante } from 'src/app/Model/Pagos/detalleComprobante';
import { TipoComprobante } from 'src/app/Model/Pagos/tipoComprobante';
import { TipoPago } from 'src/app/Model/Pagos/tipoPago';
import { AuthService } from 'src/app/Servicio/auth/auth.service';
import { MatriculaService } from 'src/app/Servicio/moduloMatricula/matriculaServices/matricula.service';
import { KitService } from 'src/app/Servicio/modulo_invetario/kit.service';
import { MensajesSweetService } from 'src/app/Servicio/modulo_invetario/mensajes-sweet.service';
import { ComprobanteService } from 'src/app/Servicio/pagos/comprobante.service';
import { DetalleComprobanteService } from 'src/app/Servicio/pagos/detalleComprobante.service';
import { GenerarComprobantePdfService } from 'src/app/Servicio/pagos/generarComprobante-pdf.service';
import { TipoPagoService } from 'src/app/Servicio/pagos/tipoPago.service';
import { TipoPagokit } from '../../../../Model/Pagos/tipoPago';
import { Comprobante } from '../../../../Model/Pagos/comprobante';
import { ConceptoPago } from '../../../../Model/Pagos/conceptoPago';


@Component({
  selector: 'app-listar-comprobantes',
  templateUrl: './listar-comprobantes.component.html',
  styleUrls: ['./listar-comprobantes.component.scss'],
  providers: [ConfirmationService]
})
export class ListarComprobantesComponent implements OnInit {

  comprobanteDialog: boolean = false;

  detalleComprobantes: DetalleComprobante[]=[];
  matriculas: Matricula[]=[];
  matricula: Matricula = new Matricula;
  kits: Kit[]=[];
  kit: Kit = new Kit;
  precioKit?: TipoPagokit;
  tiposComprobante: TipoComprobante[] = [];
  conceptosPago: ConceptoPago[] = [];
  tiposPago: TipoPago[]=[];
  
  tipoComprobante?: TipoComprobante;
  peridoActual = 0;

  selectComprobante?: DetalleComprobante| null;
  comporbanteSaldo?: Comprobante;
  displayComprobante: boolean = false;
  displayComprobanteDetalle: boolean = false;

  esTipoMatricula: boolean = false;
  esTipoMensual: boolean = false;
  esTipoKit: boolean = false;

  public comprobanteForm: FormGroup = this._formBuilder.group({

      tipoPago: [ , [Validators.required]],
      tipoComprobante: [ , [Validators.required]],
      valor_total: [ , [Validators.required]], /* Lo que el estudiante entrega de dinero a pagar*/
      valor: [ , [Validators.required]], /* */
      detalle: [],
      
      
  });
  constructor(private comprobanteService: ComprobanteService,
    private _formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _matriculaService: MatriculaService,
    private _kitListService: KitService,
    private _tipoPagoService: TipoPagoService,
    private _detalleComprobanteService: DetalleComprobanteService,
    private _genearComprobanteService: GenerarComprobantePdfService,
    private _mensajeSweetService: MensajesSweetService,
    private _comprobanteService: ComprobanteService,
    private _authService: AuthService ) { }
  date?:Date;
  ngOnInit(): void {
    this.getComprobantes();
    this.getTipoPago();
    this.getListaKits(this.peridoActual);
    this.getConceptosPago();
    
  }

  getMatriculaPorCedula(event:any){
    this.esTipoMensual = false;
    this.esTipoMatricula = false;
    this.esTipoKit = false;
    this._matriculaService.getMatriculaPorCedula(event.query.trim()).subscribe({
      next:(resp)=>{
        this.comprobanteForm.reset();
        this.matriculas=resp;
        this.getListaKits(this.matriculas[0].id_periodo.id_periodo);    
      },
      error:(err)=>{
        this.matriculas=[];
      }
    });
  }

  getListaKits = (peridoActual: number) => {
    if (peridoActual==0) {
      this._kitListService.getKits().subscribe({
        next: (resp) => {
          this.kits = resp as Kit[];
        }
      })  
    }else{
      this._kitListService.getKits().subscribe({
        next: (resp) => {
          console.log(resp);        
          this.kits = resp as Kit[];
          this.kits.filter(periodoKit=>{
            return periodoKit.periodo?.id_periodo == this.peridoActual;        
          })
        }
      })
    }
  }

  getConceptosPago(){
    this._tipoPagoService.getConceptoPago().subscribe({
      next:(resp)=>{        
        this.conceptosPago=resp;         
      },
      error:(err)=>{
        this.conceptosPago=[];
      }
    });
  }

  getTipoPago(){
    this._tipoPagoService.getTipoPago().subscribe({
      next:(resp)=>{
        this.tiposPago=resp; 
      },
      error:(err)=>{
        this.tiposPago=[];
      }
    });
  }

  getComprobantes(){
    this.comprobanteService.getAllComprobante()
    .subscribe(comprobante => {
      this.detalleComprobantes=comprobante});
  }

  seleccionTipoComp(conceptoPago: ConceptoPago){
    this.comporbanteSaldo = undefined;
    switch (conceptoPago.descripcion) {
      case 'Matricula':
        this.esTipoMatricula = true;
        this.esTipoMensual = false;
        this.esTipoKit = false;
        this.tipoComprobante = { id_conceptoPago: conceptoPago, id_periodo: this.matricula.id_periodo };
        this.comprobanteForm.patchValue({valor: this.matricula.id_periodo.costo_matricula});
        this.getComprobanteSaldo(this.matricula.id_matricula!, conceptoPago.id_conceptoPago!);
        break;
      case 'Mensual':
        this.esTipoMensual = true;
        this.esTipoMatricula = false;
        this.esTipoKit = false;
        this.tipoComprobante = { id_conceptoPago: conceptoPago, id_periodo: this.matricula.id_periodo };
        this.comprobanteForm.patchValue({valor: this.matricula.id_periodo.costo_mensualidad});
        this.getComprobanteSaldo(this.matricula.id_matricula!, conceptoPago.id_conceptoPago!);
        break;
      case 'Kit':
        this.esTipoMensual = false;
        this.esTipoMatricula = false;
        this.esTipoKit = true;
        this.tipoComprobante = { id_conceptoPago: conceptoPago, id_periodo: this.matricula.id_periodo };
        this.getComprobanteSaldo(this.matricula.id_matricula!, conceptoPago.id_conceptoPago!);
        this.getPrecioKit();
        break;
      default:
        break;
    }
    
  }
  
  getPrecioKit = () => {
    this._comprobanteService.getKitPrecio(this.matricula.estudiante.id_estudiante!).subscribe({
      next: (resp) => {
        this.precioKit = resp;
        this.comprobanteForm.patchValue({valor: resp.precioKit});
      },
      error: (error) => console.log
    })
  }

  getComprobanteSaldo = (idMatricula: number, idTipoCom: number) => {
    this._comprobanteService.getcomprobateSaldo(idMatricula,idTipoCom).subscribe({
      next: (resp) => {
        this.comporbanteSaldo = resp.comprobante;
        
      },
      error: (error) => this.comporbanteSaldo = undefined
    })
  }

  crearComprobante(){
    if (this.comprobanteForm.invalid) {
      this.comprobanteForm.markAllAsTouched();
      return;
    }    
    let {valor, detalle, valor_total, tipoPago, tipoComprobante} = this.comprobanteForm.value;
    let estado: boolean = true;
    let saldo: number = 0;
    if ( valor_total < valor) {
      if ( this.comporbanteSaldo ) {
        saldo = this.comporbanteSaldo.saldo - valor_total;
        saldo === 0 ? estado = true : estado = false; 
      } else {
        saldo = valor - valor_total;
        estado = false;
      }
    }
    let detalleComprobante: DetalleComprobante = {
      detalle,
      valor,    
      idComprobante:  {
        saldo,
        estado,
        fecha: new Date(),
        idMatricula: this.matricula,
        tipoComprobante: this.tipoComprobante!,
        empleado: this._authService.usuario.empleado!,
        tipoPago,
        imagen: '',
        valor_total
      }
    };    
    this._detalleComprobanteService.crearDetalleComprobante(detalleComprobante).subscribe({
      next: (resp)=>{        
        this.comprobanteForm.reset();
        if ( this.comporbanteSaldo ) {
          this._comprobanteService.actualizarComprobante(this.comporbanteSaldo?.id!).subscribe();
        }
        this.getComprobantes();
        this.esTipoMatricula=false;
        this.esTipoMensual=false;
        this.esTipoKit = false;
        this.matricula=new Matricula();
        this.tipoComprobante = new TipoComprobante();
        this._mensajeSweetService.mensajeOk('Comprobante registrado');
      },
      error: (error)=>{
        this._mensajeSweetService.mensajeError('Ups!', 'No se puedo registrar el comprobante');
      }
      
    });    
  }

  openNew() {
    this.comprobanteDialog = true;
  }

  hideDialog() {
    this.comprobanteDialog = false;
    this.matricula=new Matricula();
    this.precioKit = {};
    this.comporbanteSaldo = undefined;
    this.tipoComprobante = new TipoComprobante();
  }

  verificarCampo  = ( campo: string ): boolean => {
    return ( this.comprobanteForm.controls?.[campo].invalid || false) && ( this.comprobanteForm.controls?.[campo].touched || false );
  }

  eliminarComprobante(detalleComprobante: DetalleComprobante) {
    let nombre=detalleComprobante.idComprobante.idMatricula.estudiante?.id_persona.nombre +' '+detalleComprobante.idComprobante.idMatricula.estudiante?.id_persona.apellido;
    this._confirmationService.confirm({
        message: 'Desea eliminar el comprobante de pago del estudiante: '+ nombre  + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonStyleClass: 'p-button-danger p-button-text',
        accept: () => {
          this._detalleComprobanteService.deleteComprobante( detalleComprobante.idDetalleComprobante! ).subscribe({
            next: (resp) => {
              this._mensajeSweetService.mensajeOk('Aprobación eliminada');
              this.detalleComprobantes = this.detalleComprobantes.filter(detalle => detalleComprobante.idDetalleComprobante !== detalle.idDetalleComprobante);
            },
            error:(error)=>{
              this._mensajeSweetService.mensajeError('Upps!', `No se pudo eliminar el comprobante de pago de: ${nombre}`);
            }
          });
        }
    });
  }

  showDialog(comprobantes: DetalleComprobante){
    this.selectComprobante = comprobantes;
    this.displayComprobante = true;
  }

  showDialogDetalles(comprobantes: DetalleComprobante){
    console.log(comprobantes);
    
    this.selectComprobante = comprobantes;
    this.displayComprobanteDetalle = true;
  }

  closeDialog(){
    this.displayComprobante = false;
    this.displayComprobanteDetalle = false;
    this.selectComprobante = null;
  }

  

  generarComprobantePdf(imprimir: boolean){
    this._genearComprobanteService.generarComprobante(this.selectComprobante!, imprimir);
  }
}
