import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentoServiceService } from 'src/app/Servicio/secretaria/bitacoraServices/documentoServices/documento-service.service';

@Component({
  selector: 'app-agregar-documento',
  templateUrl: './agregar-documento.component.html',
  styleUrls: ['./agregar-documento.component.scss']
})
export class AgregarDocumentoComponent implements OnInit {

  constructor(private router:Router, private documentoService: DocumentoServiceService , private formBuilder: FormBuilder, ) {   }

  addForm!: FormGroup;
  
  submitted = false;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id_registro_bitacora: [],
      tipo_documento: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      });
  }


  regresar(){
    this.router.navigate(["secretariaModule/listarBitacora"]);
  }   

  get f() {return this.addForm.controls}

  ingreso(){
    this.submitted = true;
    this.documentoService.createDocumento(this.addForm.value).subscribe(data=>{
      console.log(this.addForm.value)
      alert('Documento ingresado');
      this.router.navigate(['secretariaModule/listarDocumento']);
    });
  }

}
