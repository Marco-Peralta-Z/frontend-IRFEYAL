import { Component, OnInit } from '@angular/core';
import { ModuloService } from '../../../../../../Servicio/modulo_invetario/modulo.service';
import { Modulo } from '../../../../../../Model/Inventarios/ModuloLibro';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Kit } from '../../../../../../Model/Inventarios/Kit';
import { KitService } from '../../../../../../Servicio/modulo_invetario/kit.service';
import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResKit } from '../../../../../../Model/Inventarios/interfaces/res_kit.interface';
import { PeriodoService } from '../../../../../../Servicio/parametrizacion/Service Periodo/periodo.service';
import { Periodo } from '../../../../../../Model/Parametrizacion/Periodo';

@Component({
  selector: 'app-crear-editar-kit',
  templateUrl: './crear-editar-kit.component.html',
  styleUrls: ['./crear-editar-kit.component.css']
})
export class CrearEditarKitComponent implements OnInit {

  public kitForm: FormGroup = this._formBuilder.group({
    nombrekit: [ , [ Validators.required]],
    precioKit: [ , [ Validators.required]],
    periodo: [  , [ Validators.required]],
    listaModulos: [ ],
  });

  public id?: number;
  public modulos: Modulo [] = [];
  public periodos: Periodo [] = [];
  public selectPeriodo?: Periodo;
  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _kitService: KitService,
    private _moduloService: ModuloService,
    private _periodoService: PeriodoService,
    private _mensajesSweetService: MensajesSweetService,
  ) { }

  ngOnInit(): void {
    this.getKitIdParam();
    this.getModulos();
    this.getPeriodos();
  }
  getKitIdParam = () => {
    this._activatedRoute.paramMap.subscribe( params => {      
      this.id = +params.get('id')!;
      if ( this.id && !isNaN(this.id)) {
        this.getKit(this.id);        
      } else {
        this._router.navigate(['/inventariosModule/kit/crear']);
      }
    });
  }
  getModulos = () => {
    this._moduloService.getModulos().subscribe({
      next: (resp) => {
        this.modulos = resp as Modulo [];
      },
      error: (error) => {
        this.modulos = [];
      }
    });
  }
  getPeriodos = () => {
    this._periodoService.getAllPerdiodo().subscribe({
      next: (resp:any) => {
        console.log(resp);
        
        this.periodos = resp as Periodo [];
      },
      error: (error:any) => {
        this.periodos = [];
      }
    });
  }

  verificarAccion = () => {
    if( this.kitForm.valid ) {
      let kit: Kit = this.kitForm.value;
      console.log(kit);
      
      if ( this.id ) {
        this.actualizarKit( kit );
      } else {
        this.crearKit( kit );
      }
    } else {
      this.kitForm.markAllAsTouched();
    }
  }

  crearKit = ( kit: Kit ) => {
    this._kitService.crearKit( kit ).subscribe({
      next: (response) => {
        if ( response === 'ok') {
          this._mensajesSweetService.mensajeOk('Kit creado');
          this.kitForm.reset();
        } else {
          this._mensajesSweetService.mensajeError('Upss!', 'No se pudo crear el kit',);
        }
      }
    })
  }

  actualizarKit = ( kit: Kit ) => {
    this._kitService.actualizarKit( this.id!, kit ).subscribe({
      next: ( response ) => {
        if ( response === 'ok') {
          this.kitForm.reset();
          this._mensajesSweetService.mensajeOk('Kit Actualizado');
          this._router.navigate(['/inventariosModule/kit/listar']);
        } else {            
          this._mensajesSweetService.mensajeError('Upss!', 'No se pudo actualizar el kit',);
        }
      }
    });
  }

  getKit = (id: number) => {
    this._kitService.getKitPorId( id ).subscribe({
      next: (response: ResKit) => {        
        if ( response.status === 'ok' ) {
          this.kitForm.patchValue(response.kit);
        }
      },
      error: (error) => {
        if (error.status === 404) {
          this._mensajesSweetService.mensajeError('Upss!', 'No se pudo encontrar ese Kit',);
          this._router.navigate(['/inventariosModule/kit/listar']);
        }
      }
    });
  }

  compararPeriodo(o1: Periodo, o2: Periodo): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined? false : o1.id_periodo === o2.id_periodo;
  }

  verificarCampo  = ( campo: string ): boolean => {
    return ( this.kitForm.controls?.[campo].invalid || false) && ( this.kitForm.controls?.[campo].touched || false );
  }
}
