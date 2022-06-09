import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css']
})
export class CrearEditarComponent implements OnInit {

  public categoriaForm: FormGroup = this._formBuilder.group({
    nombre: [ , [ Validators.required]],
    codigo: [ , [ Validators.required]],
  });


  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  realizarAccion = () => {
    
  }

  verificarCampo  = ( campo: string ): boolean => {
    return ( this.categoriaForm.controls?.[campo].invalid || false)  ;
    // return ( this.categoriaForm.controls?.[campo].invalid || false) && ( this.categoriaForm.controls?.[campo].touched || false );
  }

}
