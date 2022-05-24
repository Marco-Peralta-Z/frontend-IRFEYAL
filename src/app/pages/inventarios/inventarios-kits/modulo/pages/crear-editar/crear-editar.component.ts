import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuloService } from '../../../../../../Servicio/modulo_invetario/modulo.service';
import { Modulo } from '../../../../../../Model/Inventarios/ModuloLibro';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css']
})
export class CrearEditarComponent implements OnInit {

  public moduloForm: FormGroup = this._formBuilder.group({
    nombreModulo: [ , [ Validators.required ] ],
    curso: [ , [ Validators.required ] ],
    cantidad: [ , [ Validators.required ] ],
    numero: [ , [ Validators.required ] ],
    numeroModulo: [ , [ Validators.required ] ],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _moduloService: ModuloService,
  ) { }

  ngOnInit(): void {
  }

  crearModulo = () => {
    if ( this.moduloForm.valid ) {
      let modulo: Modulo = this.moduloForm.value;
      this._moduloService.crearModulo( modulo ).subscribe({
        next: ( resp ) => {
          console.log(resp);
        }, 
        error: ( error ) => {
          console.log(error);
          
        }
      })
    }
  }

}
