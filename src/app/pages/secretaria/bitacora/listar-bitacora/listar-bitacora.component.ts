
import { Component, OnInit } from '@angular/core';
import { Bitacora } from 'src/app/Model/Secretaria/bitacora';
import { Router } from '@angular/router';
import { Documento } from 'src/app/Model/Secretaria/documento';
import { BitacoraServiceService } from 'src/app/Servicio/secretaria/bitacoraServices/bitacora-service.service';
import { DocumentoServiceService } from 'src/app/Servicio/secretaria/bitacoraServices/documentoServices/documento-service.service';


@Component({
  selector: 'app-listar-bitacora',
  templateUrl: './listar-bitacora.component.html',
  styleUrls: ['./listar-bitacora.component.scss']
})
export class ListarBitacoraComponent implements OnInit {
  documentos: Documento[] = [];


  bitacoras: Bitacora[] = [];
  bitacoraact!: Bitacora;
  now = new Date();

  documentoact!:Documento;


  constructor(private router: Router, private bitacoraService: BitacoraServiceService, private documentoService: DocumentoServiceService) { }

  ngOnInit(): void {
    this.bitacoraService.getBitacora()
      .subscribe(bitacora => {
        this.bitacoras = bitacora
        // console.log(this.bitacoras)
      });

      this.documentoService.getDocumento()
      .subscribe(documento => {
        this.documentos = documento
      });

  }

  regresarHome() {
    this.router.navigate(["home"]);
  }

  refrescar() {
    this.ngOnInit();
    this.router.navigate(["secretariaModule/listarBitacora"]);
  }

  ingreso() {
    this.router.navigate(["secretariaModule/agregarDocumento"]);
  }

  procesar(bitacoraNew: Bitacora) {
   
    
    this.bitacoras = this.bitacoras.filter(val => val.id_registro_bitacora !== bitacoraNew.id_registro_bitacora);//obtengo objeto bitacora
  


    this.ngOnInit();


    bitacoraNew.estado = 'Entregado'//actualizar variables
    bitacoraNew.fecha = this.now;
    bitacoraNew.id_registro_bitacora = 0;
    //bitacoraNew.id_documento.tipo_documento='tipodoc';
   
    this.bitacoraact = bitacoraNew
    this.bitacoraService.createBitacora(this.bitacoraact).subscribe(data => { 
      //console.log(this.bitacoraact)
      alert('DOCUMENTO ENTREGADO');
      this.router.navigate(['secretariaModule/listarBitacora']);
      this.ngOnInit();
    });
  }  

}
