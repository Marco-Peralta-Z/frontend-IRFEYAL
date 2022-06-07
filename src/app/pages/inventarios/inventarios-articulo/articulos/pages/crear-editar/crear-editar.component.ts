import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css']
})
export class CrearEditarComponent implements OnInit {
  public inventarioForm: FormGroup = this._formBuilder.group({
  });
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  realizarAccion = () => {
    
  }
}
