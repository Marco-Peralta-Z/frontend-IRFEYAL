
import { Component, OnInit } from '@angular/core';
import { Bitacora } from 'src/app/Model/Secretaria/bitacora';
import { Router } from '@angular/router';
import { Documento } from 'src/app/Model/Secretaria/documento';
import { BitacoraServiceService } from 'src/app/Servicio/secretaria/bitacoraServices/bitacora-service.service';
import { DocumentoServiceService } from 'src/app/Servicio/secretaria/bitacoraServices/documentoServices/documento-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-listar-bitacora',
  templateUrl: './listar-bitacora.component.html',
  styleUrls: ['./listar-bitacora.component.scss']
})
export class ListarBitacoraComponent implements OnInit {
  documentos: Documento[] = [];
  comprobanteDialog: boolean = false;

  bitacoras: Bitacora[] = [];
  bitacoraact!: Bitacora;



  documentoact!: Documento;

  documentoFormulario!: FormGroup;
  doc!: Documento;

  constructor(private router: Router, private bitacoraService: BitacoraServiceService, private documentoService: DocumentoServiceService, private formBuilder: FormBuilder) { }

  addForm!: FormGroup;
  submitted = false;
  now = new Date();


  ngOnInit() {
    this.bitacoraService.getBitacora()
      .subscribe(bitacora => {
        this.bitacoras = bitacora
       // console.log(this.bitacoras)
      });

    this.documentoService.getDocumento()
      .subscribe(documento => {
        this.documentos = documento
      });

    this.addForm = this.formBuilder.group({
      id_registro_bitacora: [],
      solicitante: ['', Validators.required],
      emisor: ['', Validators.required],
      fecha: this.now,
      estado: ['Pendiente'],
      documento: new Documento ()

    });

    this.documentoFormulario = new FormGroup({
      documentSelec: new FormControl(null)
    });

  }

  regresarHome() {
    this.router.navigate(["home"]);
  }

  refrescar() {
    this.ngOnInit();
  }

  

  procesar(bitacoraNew: Bitacora) {
    bitacoraNew.estado = 'Entregado'//actualizar variables
    bitacoraNew.fecha = this.now;
    bitacoraNew.id_registro_bitacora = 0;
    this.bitacoraact = bitacoraNew
    this.bitacoraService.createBitacora(this.bitacoraact).subscribe(data => {
      alert('DOCUMENTO ENTREGADO');
      this.ngOnInit();
    });
  }

  openNew() {
    this.comprobanteDialog = true;
  }

  hideDialog() {
    this.comprobanteDialog = false;
  }

  ingreso() {
    this.submitted = true;
    if (this.addForm.invalid) {
      alert('Ingrese todos los campos')
      return;
    }
    this.documentoService.getDocumentoId(this.documentoFormulario.get('documentSelec')?.value).subscribe(data => {
      this.addForm.value.documento = data.id_documento;
      console.log(this.addForm.value)
      
      this.bitacoraService.createBitacora(this.addForm.value).subscribe(data => {
        
        alert('BITACORA INGRESADA');
        this.ngOnInit();
        this.hideDialog()
      });

    });
  }


  
  /*  ingreso() {
    this.submitted = true;
    if (this.addForm.invalid) {
      alert('Ingrese todos los campos')
      return;
    }
    
    console.log(this.addForm.value)

    this.bitacoraService.createBitacora(this.addForm.value).subscribe(data => {
      alert('BITACORA INGRESADA');
      this.ngOnInit();
      this.hideDialog()
    });
  }*/
  

}
