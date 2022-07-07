import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Router } from '@angular/router';
import { Documento } from 'src/app/Model/Secretaria/documento';
import { DocumentoServiceService } from 'src/app/Servicio/secretaria/bitacoraServices/documentoServices/documento-service.service';


@Component({
  selector: 'app-listar-documento',
  templateUrl: './listar-documento.component.html',
  styleUrls: ['./listar-documento.component.scss']
})
export class ListarDocumentoComponent implements OnInit {

  documentos: Documento[]=[];
  comprobanteDialog: boolean = false;

  


  constructor(private router:Router,private documentoService: DocumentoServiceService,private formBuilder: FormBuilder) { }
  addForm!: FormGroup;
  
  submitted = false;


  ngOnInit() {
    this.documentoService.getDocumento()
    .subscribe(documento => this.documentos = documento);

    this.addForm = this.formBuilder.group({
      id_documento: [],
      tipo_documento: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      });
  }

  regresarHome(){
    this.router.navigate(["home"]);
  }   













  openNew() {
    this.comprobanteDialog = true;
  }

  hideDialog() {
    this.comprobanteDialog = false;
  }

  regresar(){
    this.router.navigate(["secretariaModule/listarBitacora"]);
  }   

  ingreso(){
    this.submitted = true;
    if (this.addForm.invalid) {
      alert('Ingrese todos los campos')
      return;
    }
    this.documentoService.createDocumento(this.addForm.value).subscribe(data=>{
      console.log(this.addForm.value)
      alert('Documento ingresado');
      this.hideDialog();
      this.ngOnInit();
    });
  }

}
