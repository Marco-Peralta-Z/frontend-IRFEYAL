import { Component, OnInit } from '@angular/core';
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
  constructor(private router:Router,private documentoService: DocumentoServiceService) { }

  ngOnInit(): void {
    this.documentoService.getDocumento()
    .subscribe(documento => this.documentos = documento);
  }

  regresarHome(){
    this.router.navigate(["home"]);
  }   

  eliminar(){
    
  }  

}
