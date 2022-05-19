import { Component, OnInit } from '@angular/core';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { MallaService } from 'src/app/Servicio/parametrizacion/Service Malla/malla.service';
import { PeriodoService } from 'src/app/Servicio/parametrizacion/Service Periodo/periodo.service';

@Component({
  selector: 'app-malla',
  templateUrl: './malla.component.html',
  styleUrls: ['./malla.component.scss'],
  styles: [`
      :host ::ng-deep .p-dialog .product-image {
          width: 150px;
          margin: 0 auto 2rem auto;
          display: block;
      }
  `],
})
export class MallaComponent implements OnInit {

  constructor(private servicemalla: MallaService, private serviceperiodo: PeriodoService) { }
  malla: Malla[] = [];
  peridos!: Periodo[];
  selecperiodo!: Periodo;
  ngOnInit(): void {
    this.servicemalla.getAllMalla().subscribe(data => {
      this.malla = data;
    })

    this.serviceperiodo.getAllPerdiodo().subscribe(data => {
      this.peridos = data;
    })
  }

  verPeriodo(ma: Malla) {
    this.peridos.forEach(element => {
      if (element.malla.id_malla == ma.id_malla) {
        this.selecperiodo = element;
      }
    });
  }
}
